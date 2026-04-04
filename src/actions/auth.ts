"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { createHttpCookieToken } from "@/lib/token";

import { LoginFormSchema } from "@/schemas/loginForm";
import { FormState, SignupFormSchema } from "@/schemas/signupForm";

export const signup = async (state: FormState, formData: FormData) => {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  const initialData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return {
      errors: flattened.fieldErrors,
      data: initialData,
    };
  }

  const { name, email, password } = validatedFields.data;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return {
      errors: {
        email: ["Email is already taken."],
        name: [],
        password: [],
        confirmPassword: [],
      },
      data: validatedFields.data,
    };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true, message: "Account created successfully!" };
  } catch (error) {
    return {
      error: error,
      message:
        "An error occurred while creating the account. Please try again.",
      data: validatedFields.data,
    };
  }
};

export const login = async (state: FormState, formData: FormData) => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return {
      errors: flattened.fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  // Check if user exists
  const user = await prisma.user.findUnique({ where: { email } });

  // If user doesn't exist, return an error
  if (!user) {
    return {
      errors: {
        email: ["Invalid email or password."],
        password: ["Invalid email or password."],
      },
    };
  }

  // Check if password is correct
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  // If password is incorrect, return an error
  if (!isPasswordValid) {
    return {
      errors: {
        email: ["Invalid email or password."],
        password: ["Invalid email or password."],
      },
    };
  }

  // If password is correct, log the user in by creating a token and returning the token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  await createHttpCookieToken(token);

  return { success: true, message: "Logged in successfully!" };
};
