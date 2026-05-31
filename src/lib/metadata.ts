import type { Metadata } from "next";
import { siteConfig } from "@/data/core";

export function buildMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.nameArabic}`,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: "ar_EG",
      type: "website",
    },
  };
}
