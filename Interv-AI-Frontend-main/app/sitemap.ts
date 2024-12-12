import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://interv-ai-frontend-pi.vercel.app/",
      lastModified: new Date(),
    }
  ];
}
