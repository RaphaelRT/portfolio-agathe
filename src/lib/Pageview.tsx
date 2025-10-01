"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "page_view", page_path: url });
  }, [pathname, searchParams]);

  return null;
}


