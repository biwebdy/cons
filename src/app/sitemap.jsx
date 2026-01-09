export default async function sitemap() {
  const data = [];
  const url = process.env.NEXT_PUBLIC_FRONT_END_URL || "https://expertree.com";
  return [
    {
      url: `${url}`,
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${url}/contact`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${url}/terms`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${url}/privacy`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${url}/login`,
      lastModified: new Date(),
      priority: 0.8,
    },

    ...data,
  ];
}
