"use client";


export async function postClientRegistrationForm(formData) {
    const url = "/api/client-registration-forms"; // Use relative URL for Next.js API route


    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            formData
        }),
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to submit form');
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error("Form submission error:", error);
        throw error;
    }
}
