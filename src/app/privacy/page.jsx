import Header from "@/components/header/Header";
import Privacy from "@/components/section/Privacy";

export const metadata = {
  title: "Expertree | Privacy Policy",
};
export const revalidate = 10;
export default function page() {
  return (
    <>
      <Header /> <Privacy />{" "}
    </>
  );
}
