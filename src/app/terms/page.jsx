import Header from "@/components/header/Header";
import TermsConditions from "@/components/section/TermsConditions";

export const metadata = {
  title: "Expertree | Terms & Conditions",
};
export const revalidate = 10;
export default function page() {
  return (
    <>
      <Header />
      <TermsConditions />
    </>
  );
}
