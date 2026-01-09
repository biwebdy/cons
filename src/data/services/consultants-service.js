"use server";
import { fetchData } from "../common/utils";

export async function createConsultant(consultant) {
  const url = "/api/consultants";
  try {
    const response = await fetchData(url, {
      method: "POST",
      body: JSON.stringify(consultant),
    });
    return response;
  } catch (error) {
    console.error("Failed to get consultants:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
}
