export default function robots() {
  const url = process.env.NEXT_PUBLIC_FRONT_END_URL || "https://expertree.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/secure", "/secure/*", "/secure/login", "/secure/login/*"],
      },
    ],
    sitemap: `${url}/sitemap.xml`,
  };
}
