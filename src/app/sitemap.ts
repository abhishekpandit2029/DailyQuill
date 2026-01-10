import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // HomePage
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/home`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },

    // Auth Pages
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/login/email`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/signup/email`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/forgot-password/email`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/email`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // Dashboard Pages
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/feed`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/inbox`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/profile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
