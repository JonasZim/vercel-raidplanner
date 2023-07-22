"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  function getPlanIdFromUrl(url: string): string | null {
    const regex = /\/plan\/(.+)/;
    const match = url.match(regex);
    if (match) {
      return match[1];
    }
    return null;
  }
  const pathname = usePathname();
  console.log(pathname);
  const para = getPlanIdFromUrl(pathname);
  return (
    <div>
      <h1>Page {para}</h1>
    </div>
  );
}
