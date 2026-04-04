"use server";

import { z } from "zod";

import { auth } from "@/lib/auth";

import { LoginFormSchema } from "@/schemas/loginForm";
import { FormState, SignupFormSchema } from "@/schemas/signupForm";

export const signup = async (state: FormState, formData: FormData) => {
  // validate user input fields using zod schema
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // get form data to persist values in case of validation errors
  const initialData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  // return errors if validation fails
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return {
      errors: flattened.fieldErrors,
      data: initialData,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // Use better-auth to create a new user with email and password
    const res = await auth.api.signUpEmail({
      body: { name, email, password },
      asResponse: true,
    });

    // if res is not ok, throw an error.
    // we know that the only possible error atp is that the email is already taken,
    // so we can return a specific error message for that.
    if (!res.ok) {
      return {
        errors: { email: ["Email is already taken."] },
        data: initialData,
      };
    }

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

  const response = await auth.api.signInEmail({
    body: { email, password },
    asResponse: true,
  });

  if (!response.ok) {
    return {
      errors: {
        email: ["Invalid email or password."],
        password: ["Invalid email or password."],
      },
    };
  }

  return { success: true, message: "Logged in successfully!" };
};
