"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { Logo } from "@/components/logo";
import { MenuIcon, XIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { navItems, whatsappLinks } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-ink/94 text-white backdrop-blur-xl"
      initial={reduceMotion ? undefined : { opacity: 0, y: -10 }}
      transition={reduceMotion ? undefined : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:h-24 sm:px-6 lg:px-8">
        <Logo inverse />

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                className={cn(
                  "relative text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red",
                  isActive ? "text-white" : "text-white/68 hover:text-white",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
                <motion.span
                  layoutId={isActive ? "active-nav-line" : undefined}
                  className={cn(
                    "absolute -bottom-2 left-0 h-px bg-brand-red transition-all",
                    isActive ? "w-full opacity-100" : "w-6 opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/consulta-juridica" variant="primary">
            Agendar consulta
          </ButtonLink>
          <ButtonLink external href={whatsappLinks.general} variant="ghost" className="text-white hover:bg-white/8 hover:text-white">
            WhatsApp
          </ButtonLink>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-sm border border-white/15 text-white transition hover:border-brand-red hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red">
            <span className="sr-only group-open:hidden">Abrir menú</span>
            <span className="sr-only hidden group-open:inline">Cerrar menú</span>
            <MenuIcon className="h-5 w-5 group-open:hidden" />
            <XIcon className="hidden h-5 w-5 group-open:block" />
          </summary>
          <div className="absolute right-0 mt-3 w-[min(88vw,22rem)] border border-white/10 bg-ink p-3 shadow-2xl shadow-black/45">
            <nav className="flex flex-col" aria-label="Navegación móvil">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    className={cn(
                      "border-b border-white/8 px-3 py-3 text-sm font-medium transition hover:bg-white/6 hover:text-white",
                      isActive ? "text-white" : "text-white/78",
                    )}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <ButtonLink className="mt-3 w-full" href="/consulta-juridica">
                Agendar consulta
              </ButtonLink>
              <ButtonLink className="mt-2 w-full text-white hover:bg-white/8 hover:text-white" external href={whatsappLinks.general} variant="ghost">
                WhatsApp
              </ButtonLink>
            </nav>
          </div>
        </details>
      </div>
    </motion.header>
  );
}
