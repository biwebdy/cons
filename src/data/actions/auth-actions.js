"use server";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  changePasswordService,
  loginUserService,
  registerUserService,
} from "@/data/services/auth-service";
import { getFrontEndURL } from "../common/serverVariable";
import { getUserMeLoader } from "../services/get-user-me-loader";
import { roleMap } from "@/middleware";

const schemaRegister = z.object({
  username: z.string().min(3).max(27, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function registerUserAction(prevState, formData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }
  redirect(getFrontEndURL() + "/dashboard");
}

const schemaLogin = z.object({
  identifier: z
    .string()
    .email()
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(100, {
      message: "Please enter a valid email address",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must have at least 8 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function loginUserAction(prevState, formData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  let responseData = await loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error || responseData.status !== 200 || responseData.data.user.blocked) {
    let message = responseData.error || responseData.message;
    if (responseData.message === "Not Found") {
      message = "Invalid email or password";
    }
    return {
      ...prevState,
      strapiErrors: { message },
      zodErrors: null,
      message: "Failed to Login.",
    };
  }
  await handleRedirection();
}

const schemaChangePassword = z.object({
  currentPassword: z
    .string()
    .min(8, {
      message: "Current password must have at least 8 or more characters",
    })
    .max(100, {
      message: "Current password must be between 8 and 100 characters",
    }),
  newPassword: z
    .string()
    .min(8, {
      message: "New password must have at least 8 or more characters",
    })
    .max(100, {
      message: "New password must be between 8 and 100 characters",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Confirm password must have at least 8 or more characters",
    })
    .max(100, {
      message: "Confirm password must be between 8 and 100 characters",
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


export async function changePasswordAction(prevState, formData) {
  const validatedFields = schemaChangePassword.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to change password.",
    };
  }

  let responseData = await changePasswordService(
    validatedFields.data.currentPassword,
    validatedFields.data.newPassword
  );

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: { message: "No response from server" },
      zodErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error || responseData.status !== 200) {
    return {
      ...prevState,
      strapiErrors: responseData.error || { message: responseData.message },
      zodErrors: null,
      message: "Failed to change password.",
    };
  }
  await handleRedirection();
}

const handleRedirection = async () => {
  const user = await getUserMeLoader(true, true);
  const role = user.data?.role.name || "unknown";

  switch (role) {
    case roleMap.ADMIN:
      redirect(getFrontEndURL() + "/secure/manage-consultants");
    case roleMap.CLIENT:
      if (!user.data?.passwordChanged) {
        redirect(getFrontEndURL() + "/change-password");
      } else {
        redirect(getFrontEndURL() + "/client-personalized");
      }
    case roleMap.SUB_CLIENT:
      if (!user.data?.passwordChanged) {
        redirect(getFrontEndURL() + "/change-password");
      } else {
        redirect(getFrontEndURL() + "/client-account-personalized");
      }
    case roleMap.CONSULTANT:

      if (!user.data?.passwordChanged) {
        redirect(getFrontEndURL() + "/change-password");
      } else if (user.data.consultant?.approval !== "APPROVED") {
        redirect(getFrontEndURL() + "/register/contract");
      } else if (user.data.consultant?.approval === "APPROVED" && !user.data?.consultant?.profileCompleted) {
        redirect(getFrontEndURL() + "/edit-profile");
      } else {
        redirect(getFrontEndURL() + "/consultant-personalized");
      }
    default:
      console.error("***---- Unknown role: ", role);

  }
};