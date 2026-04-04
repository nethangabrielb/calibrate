"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import prisma from "@/lib/prisma";

import { FormState, SignupFormSchema } from "@/schemas/signupForm";

export const signup = async (state: FormState, formData: FormData) => {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return {
      errors: flattened.fieldErrors,
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
      },
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
    };
  }
};
