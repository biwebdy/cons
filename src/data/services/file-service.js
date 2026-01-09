import { getAuthToken } from "@/data/services/token";
import { mutateData } from "@/data/services/retrieve-data";
import { flattenAttributes } from "@/lib/utils";
import { fetchData, getStrapiURL } from "../common/utils";
import { getPrivateStrapiURL } from "../common/serverVariable";

export async function fileDeleteService(imageId) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const data = await mutateData("DELETE", `/api/upload/files/${imageId}`);
  const flattenedData = flattenAttributes(data);

  return flattenedData;
}

export async function fileUploadService(image) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const baseUrl = getPrivateStrapiURL();
  const url = new URL("/api/upload", baseUrl);

  const formData = new FormData();
  formData.append("files", image, image.name);

  try {
    const response = await fetchData(url, {
      method: "POST",
      body: formData,
    });
    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
