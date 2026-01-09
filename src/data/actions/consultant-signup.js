import { z } from "zod";
import { createConsultant } from "../services/consultants-service";
import { getFrontEndURL } from "../common/serverVariable";

const schemaSignup = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(["Male", "Female", "Others"]),
  dob: z.string(), //z.date()
  address: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  nationality: z.string(),
  about: z.string(),
  profilePicture: z.string().url(),
  // bankingInfo: z.object({
  //   iban: z.string(),
  //   bankName: z.string(),
  //   swiftCode: z.string(),
  //   address: z.string(),
  // }),
  // experience: z.array(
  //   z.object({
  //     title: z.string(),
  //     employer: z.string().optional(),
  //     startDate: z.string(),
  //     endDate: z.string(),
  //     details: z.string(),
  //   }),
  // ),
  languages: z.array(
    z.object({
      language: z.string(),
      level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
    }),
  ),
  education: z.array(
    z.object({
      title: z.string(),
      organization: z.string(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }),
  ),
  preferences: z.object({
    position: z.array(z.string()),
    industries: z.array(z.string()),
    daysAvailable: z.number().min(0).max(7),
    currency: z.string(),
  }),
});

export async function signupConsultantAction(prevState, formData) {
  const validatedFields = schemaSignup.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    gender: formData.get("gender"),
    dob: formData.get("dob"),
    address: formData.get("address"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    nationality: formData.get("nationality"),
    about: formData.get("about"),
    profilePicture: formData.get("profilePicture"),
    // bankingInfo: {
    //   iban: formData.get("iban"),
    //   bankName: formData.get("bankName"),
    //   swiftCode: formData.get("swiftCode"),
    //   address: formData.get("address"),
    // },
    // experience: JSON.parse(formData.get("experience")),
    languages: JSON.parse(formData.get("languages")),
    education: JSON.parse(formData.get("education")),
    preferences: {
      position: formData.getAll("position"),
      industries: formData.getAll("industries"),
      daysAvailable: parseInt(formData.get("daysAvailable")),
      currency: formData.get("currency"),
    },
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Please check your fields.",
    };
  }
  if (validatedFields.data) {
    if (validatedFields.data.gender === undefined || validatedFields.data.gender === '') {
      delete validatedFields.data.gender;
    }

    if (validatedFields.data.civilStatus === undefined || validatedFields.data.civilStatus === '') {
      delete validatedFields.data.civilStatus;
    }

    if (validatedFields.data.residencyPermit === undefined || validatedFields.data.residencyPermit === '') {
      delete validatedFields.data.residencyPermit;
    }
  }
  const responseData = await createConsultant(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Signup.",
    };
  }

  redirect(getFrontEndURL() + "/secure/manage-consultants");
}
