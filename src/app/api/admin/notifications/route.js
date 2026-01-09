import { getPrivateStrapiURL } from "@/data/common/serverVariable";
import { fetchData } from "@/data/common/utils";
import { NextResponse } from "next/server";

export async function GET() {
    const baseUrl = getPrivateStrapiURL();
    const url = new URL("/api/admin/notifications", baseUrl);

    const response = await fetchData(url.href);

    return NextResponse.json(response);
}
