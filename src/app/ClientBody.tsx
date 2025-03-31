"use client";

import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased dark bg-slate-950";
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <body className="antialiased dark bg-slate-950" suppressHydrationWarning>
      {children}
      <Toaster />
    </body>
  );
}
