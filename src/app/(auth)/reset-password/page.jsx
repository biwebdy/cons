import ResetPassword from "@/components/forms/ResetPassword";

export default function ChangePasswordPage({ searchParams }) {
  const { token } = searchParams;
  return (
    <ResetPassword token={token} />
  );
}