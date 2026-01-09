import { getPrivateStrapiURL } from "@/data/common/serverVariable";

export async function POST(req) {
    try {
        const body = await req.json();

        // Forward to Strapi
        const strapiUrl = new URL("/api/client-registration-forms", getPrivateStrapiURL());
        const strapiResponse = await fetch(strapiUrl.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: body.formData
            })
        });

        if (!strapiResponse.ok) {
            const errorData = await strapiResponse.json();
            return Response.json(
                { error: errorData.error || 'Failed to submit form' },
                { status: strapiResponse.status }
            );
        }

        const data = await strapiResponse.json();
        return Response.json(data);

    } catch (error) {
        console.error("API Route Error:", error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}


