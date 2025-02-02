"use client";

import { useState } from "react";

export default function Footer() {
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyText = (text: string, setCopied: (value: boolean) => void) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch((err) => {
        console.error("Échec de la copie : ", err);
      });
  };

  return (
    <footer
      className="pl-4 flex justify-between h-[6rem] font-marist mt-4 leading-[1.3rem] text-xl"
      role="contentinfo"
    >
      <div className="flex flex-wrap gap-x-[10vw] gap-y-[1vh] w-4/5">
        <address className="flex flex-col justify-center not-italic">
          <span>Contact Information:</span>
          <button
            type="button"
            onClick={() => copyText("+33 6 32 31 61 53", setPhoneCopied)}
            className="cursor-pointer oldstyle-nums text-left bg-transparent border-none p-0"
          >
            +33 6 32 31 61 53{" "}
            {phoneCopied && (
              <span className="ml-2 text-sm italic">Copied!</span>
            )}
          </button>
          <button
            type="button"
            onClick={() =>
              copyText("agatheminier.design@gmail.com", setEmailCopied)
            }
            className="cursor-pointer text-left bg-transparent border-none p-0"
          >
            agatheminier.design@gmail.com{" "}
            {emailCopied && (
              <span className="ml-2 text-sm italic">Copied!</span>
            )}
          </button>
        </address>

        <div className="flex flex-col justify-center">
          <span>Socials:</span>
          <p>
            Instagram:{" "}
            <a
              href="https://www.instagram.com/ag.type"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer underline"
            >
              @ag.type
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/agathe-minier"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer underline"
            >
              Agathe Minier
            </a>
          </p>
        </div>

        <nav
          className="flex flex-col justify-center pb-5"
          aria-label="Footer Navigation"
        >
          <span>Links:</span>
          <p>
            Curriculum Vitae:{" "}
            <a
              href="/cv/fr/Agathe_Minier_CV_2025_FR.pdf"
              className="cursor-pointer underline"
            >
              FR
            </a>
            /{" "}
            <a
              href="/cv/en/Agathe_Minier_CV_2025_EN.pdf"
              className="cursor-pointer underline"
            >
              EN
            </a>
          </p>
          <p>
            Portfolio:{" "}
            <a
              href="https://indd.adobe.com/view/105b3354-9ca2-46d2-95e1-048d3474eea2"
              className="cursor-pointer underline"
            >
              FR
            </a>
          </p>
        </nav>
      </div>
    </footer>
  );
}
