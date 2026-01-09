import Footer from "@/components/footer/Footer";
import NavSidebar from "@/components/sidebar/NavSidebar";
import { StoreInitializer } from "@/components/utils/StoreInitializer";
import useUserStore from "@/store/userStore";
import { DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClientInitialization from "./ClientInitialization";
import { GoogleTagManager } from "@next/third-parties/google";
export const sidebarEnable = ["/browse-consultants"];

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:3000"
  ),
  title: "Expertree",
  description:
    "Expertree is a platform that connects consultants with clients to solve business problems in the Life Science Industry.",
  openGraph: {
    images: [
      {
        url: "./icon.ico",
      },
    ],
  },
};
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export default async function RootLayout({ children }) {
  const headersList = headers();
  // Get user data from headers
  const userDataString = headersList?.get("x-user-data");
  const userData = JSON.parse(userDataString);
  let user = { ok: false, data: null, error: "authToken Is Null!" };
  if (userDataString === null) {
    user = { ok: false, data: null, error: "authToken Is Null!" };
  } else if (userData && userData?.ok) {
    user = { ok: true, data: userData?.data, error: null };
  } else {
    user = userData;
  }
  useUserStore?.setState({ user });
  const path =
    headersList?.get("x-invoke-path") ||
    headersList?.get("x-matched-path") ||
    headersList?.get("x-nextjs-matched-path") ||
    "";

  const nonce = headersList?.get("x-nonce") || "";
  // Server-side class name logic
  const bodyClassName = `${dmSans?.className} ${
    path === "/register" || path === "/login" || path === "/change-password"
      ? "bgc-thm4"
      : sidebarEnable?.includes(path)
      ? "menu-hidden-sidebar-content"
      : ""
  }`;

  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-NCP8G97Q" nonce={nonce} />
      <body className={bodyClassName}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=NCP8G97Q`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <StoreInitializer user={user} />

        <div className="wrapper ovh">
          <div>
            {children}
            {!path?.includes("/secure") && <Footer />}
          </div>
        </div>
        <NavSidebar />
        <ClientInitialization />
      </body>
    </html>
  );
}
