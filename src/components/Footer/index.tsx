"use client";

import { useState } from "react";
import { trackLinkClick } from "@/lib/analytics";

function CopyButton({ text, className, href, ariaLabel }: { text: string; className?: string; href?: string; ariaLabel?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {}
  };

  if (href) {
    return (
      <a
        href={href}
        role="button"
        onClick={handleCopy}
        aria-label={ariaLabel || `Copier ${text}`}
        className={className || "cursor-pointer text-left bg-transparent border-none p-0"}
      >
        {text}
        {copied && <span className="ml-2 text-sm italic">Copied!</span>}
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{copied ? "Copié" : ""}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel || `Copier ${text}`}
      className={className || "cursor-pointer text-left bg-transparent border-none p-0"}
    >
      {text}
      {copied && <span className="ml-2 text-sm italic">Copied!</span>}
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{copied ? "Copié" : ""}</span>
    </button>
  );
}

function FooterSection({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col justify-center ${className || ""}`}>
      <h2 className="text-base">{title}</h2>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="pl-4 flex justify-between sm:h-[6rem] h-auto font-marist mt-4 leading-[1.3rem] text-xl pb-5"
      role="contentinfo"
    >
      <div className="flex flex-wrap gap-x-[10vw] gap-y-8 sm:gap-y-[1vh] w-4/5">
        <address className="not-italic w-full sm:w-auto mb-1 sm:mb-0">
          <FooterSection title="Contact Information:">
            <a
              href="tel:+33632316153"
              onClick={() => trackLinkClick('contact','phone')}
              className="cursor-pointer oldstyle-nums text-left bg-transparent border-none p-0"
            >
              +33 6 32 31 61 53
            </a>
            <a
              href="mailto:agatheminier.design@gmail.com"
              onClick={() => trackLinkClick('contact','email')}
              className="cursor-pointer text-left underline"
            >
              agatheminier.design@gmail.com
            </a>
          </FooterSection>
        </address>

        <FooterSection title="Socials:" className="mb-1 sm:mb-0">
          <p>
            Instagram:{" "}
            <a
              href="https://www.instagram.com/ag.type"
              target="_blank"
              rel="me noopener noreferrer"
              className="cursor-pointer underline"
              onClick={() => trackLinkClick('social','instagram')}
            >
              @ag.type
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/agathe-minier"
              target="_blank"
              rel="me noopener noreferrer"
              className="cursor-pointer underline"
              onClick={() => trackLinkClick('social','linkedin')}
            >
              Agathe Minier
            </a>
          </p>
        </FooterSection>

        <nav className="mb-1 sm:mb-0" aria-label="Footer Navigation">
          <FooterSection title="Links:">
            <p>
              Curriculum Vitae:{" "}
              <a href="/cv/fr/Agathe_Minier_CV_2025_FR.pdf" className="cursor-pointer underline" onClick={() => trackLinkClick('cv','fr')}>FR</a>
              /{""}
              <a href="/cv/en/Agathe_Minier_CV_2025_EN.pdf" className="cursor-pointer underline" onClick={() => trackLinkClick('cv','en')}>EN</a>
            </p>
            <p>
              Portfolio:{" "}
              <a
                href="https://indd.adobe.com/view/105b3354-9ca2-46d2-95e1-048d3474eea2"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer underline"
                onClick={() => trackLinkClick('portfolio','fr')}
              >
                FR
              </a>
            </p>
          </FooterSection>
        </nav>
      </div>
    </footer>
  );
}
