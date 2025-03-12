import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://maktab230.vercel.app",
      lastModified: new Date().toISOString(),
    },
  ];
}
