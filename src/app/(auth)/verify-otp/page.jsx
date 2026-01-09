import VerifyOtp from "@/components/forms/VerifyOtp";

export default function page({ searchParams }) {
  const { email } = searchParams;
  return (
    <>
      <VerifyOtp email={email} />
    </>
  );
}
