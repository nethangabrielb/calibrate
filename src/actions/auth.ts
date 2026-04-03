import { z } from "zod";

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
};
