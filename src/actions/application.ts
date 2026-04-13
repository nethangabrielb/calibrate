"use server";

import z from "zod";

import { isUserAuthenticated } from "@/lib/isAuthenticated";
import prisma from "@/lib/prisma";

import { ApplicationFormSchema, FormState } from "@/schemas/application";

export const createApplication = async (
  state: FormState,
  formData: FormData,
) => {
  const { user, isAuthenticated } = await isUserAuthenticated();

  if (!isAuthenticated) {
    return {
      success: false,
      error: "User not authenticated",
      message: "You must be logged in to create an application.",
    };
  }

  const applicationData = {
    title: formData.get("title"),
    description: formData.get("description"),
    company: formData.get("company"),
    location: formData.get("location"),
    salary: Number(formData.get("salary")),
    salaryCurrency: formData.get("salaryCurrency"),
  };

  const initialData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    company: formData.get("company") as string,
    location: formData.get("location") as string,
    salary: Number(formData.get("salary")),
    salaryCurrency: formData.get("salaryCurrency") as string,
  };

  const validatedFields = ApplicationFormSchema.safeParse(applicationData);

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return {
      errors: flattened.fieldErrors,
      data: initialData,
    };
  }

  const updatedFieldsData = {
    ...validatedFields.data,
    salary: Number(validatedFields.data.salary),
  };

  try {
    const application = await prisma.job.create({
      data: {
        userId: user.id,
        ...updatedFieldsData,
      },
    });

    if (!application) {
      throw new Error("Failed to create application");
    }
  } catch (error) {
    return {
      success: false,
      error: error,
      message: "An error occurred while creating the application.",
      data: updatedFieldsData,
    };
  }

  return {
    success: true,
    message: "Application created successfully!",
  };
};

export async function updateApplication(
  id: number,
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const { user, isAuthenticated } = await isUserAuthenticated();

  if (!isAuthenticated) {
    return {
      success: false,
      error: "User not authenticated",
      message: "You must be logged in to create an application.",
    };
  }

  const application = await prisma.job.findUnique({
    where: { id },
  });

  if (!application) {
    return {
      success: false,
      error: "Application not found",
      message: "The application you are trying to update does not exist.",
    };
  }

  if (application.userId !== user.id) {
    return {
      success: false,
      error: "Permission denied",
      message: "You do not have permission to update this application.",
    };
  }

  const applicationData = {
    title: formData.get("title"),
    description: formData.get("description"),
    company: formData.get("company"),
    location: formData.get("location"),
    salary: Number(formData.get("salary")),
    salaryCurrency: formData.get("salaryCurrency"),
    status: formData.get("status"),
  };

  const validatedFields = ApplicationFormSchema.safeParse(applicationData);

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return {
      success: false,
      errors: flattened.fieldErrors,
      data: validatedFields.data,
    };
  }

  try {
    const updatedApplication = await prisma.job.update({
      where: { id },
      data: validatedFields.data,
    });

    if (!updatedApplication) {
      throw new Error("Failed to update application");
    }
  } catch (error) {
    return {
      success: false,
      error: error,
      message: "An error occurred while updating the application.",
      data: validatedFields.data,
    };
  }

  return {
    success: true,
    message: "Application updated successfully!",
  };
}

export async function deleteApplication(id: number): Promise<FormState> {
  const { user, isAuthenticated } = await isUserAuthenticated();

  if (!isAuthenticated) {
    return {
      success: false,
      error: "User not authenticated",
      message: "You must be logged in to create an application.",
    };
  }

  const application = await prisma.job.findUnique({
    where: { id },
  });

  if (!application) {
    return {
      success: false,
      error: "Application not found",
      message: "The application you are trying to delete does not exist.",
    };
  }

  if (application.userId !== user.id) {
    return {
      success: false,
      error: "Permission denied",
      message: "You do not have permission to delete this application.",
    };
  }

  try {
    await prisma.analysis.deleteMany({
      where: {
        jobId: id,
      },
    });
    await prisma.job.delete({
      where: { id },
    });
  } catch (error) {
    return {
      success: false,
      error: error,
      message: "An error occurred while deleting the application.",
    };
  }

  return {
    success: true,
    message: "Application deleted successfully!",
  };
}
