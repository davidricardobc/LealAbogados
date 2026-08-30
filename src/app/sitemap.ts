import type { MetadataRoute } from "next";
import { serviceSeoPages, siteConfig } from "@/data/site";

const lastModified = new Date("2026-08-30T00:00:00-05:00");

const routes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/consulta-juridica", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/areas-de-practica", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/servicios-empresariales", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/quienes-somos", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/contacto", changeFrequency: "monthly" as const, priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = serviceSeoPages.map((page) => ({
    path: `/${page.slug}`,
    changeFrequency: "monthly" as const,
    priority: page.slug === "abogado-laboral" || page.slug === "abogados-empresas" ? 0.92 : 0.88,
  }));

  return [...routes, ...serviceRoutes].map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
