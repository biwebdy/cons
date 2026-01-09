"use server";

import { getAuthToken } from "@/data/services/token";
import { mutateData } from "@/data/services/retrieve-data";
import { flattenAttributes } from "@/lib/utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getFrontEndURL } from "../common/serverVariable";

export async function createConsultantAction(payload) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const data = await mutateData("POST", "/api/consultants", payload);
  const flattenedData = flattenAttributes(data);
  redirect(getFrontEndURL() + "/dashboard/consultants/" + flattenedData.id);
}

export async function updateConsultantAction(prevState, formData) {
  const rawFormData = Object.fromEntries(formData);
  const id = String(rawFormData.id);

  const payload = {
    data: {
      title: rawFormData.title,
      consultant: rawFormData.consultant,
    },
  };

  const responseData = await mutateData(
    "PUT",
    `/api/consultants/${id}`,
    payload,
  );

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to update consultant.",
    };
  }

  const flattenedData = flattenAttributes(responseData);
  revalidatePath("/dashboard/consultants");

  return {
    ...prevState,
    message: "consultant updated successfully",
    data: flattenedData,
    strapiErrors: null,
  };
}

export async function deleteConsultantAction(id, prevState) {
  const responseData = await mutateData("DELETE", `/api/consultants/${id}`);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to delete consultant.",
    };
  }

  redirect(getFrontEndURL() + "/dashboard/consultants");
}
