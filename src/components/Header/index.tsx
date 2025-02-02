"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="pt-3 pl-4 pr-4 pb-3 flex justify-between h-[3rem]">
      <Link className="font-marist lg:text-xl" href="/">
        AGATHE MINIER
      </Link>

      <ul className="list-none flex flex-row">
        {[
          { name: "Work", href: "/work" },
          { name: "About", href: "/about" },
        ].map((item, id) => (
          <li key={item.href} className={id !== 1 ? "relative cursor-pointer mr-3" : "relative cursor-pointer"}>
            <Link
              href={item.href}
              className={`font-marist text-xl cursor-pointer leading-tight after:block after:h-[2px] after:bg-black after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-[1px] ${
                pathname.includes(item.href) ? "after:w-full" : "after:w-0 hover:after:w-full"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
