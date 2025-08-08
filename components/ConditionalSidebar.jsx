"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SideBar";

export default function ConditionalSidebar() {
  const pathname = usePathname();

  // Show sidebar only for routes starting with /vendors or /customer
  const showSidebar =
    pathname.startsWith("/vendors") || pathname.startsWith("/customer");

  if (!showSidebar) {
    return null;
  }

  return (
    <div className="relative">
      <AppSidebar />
      <div className="absolute -right-10 top-2 z-50">
        <SidebarTrigger />
      </div>
    </div>
  );
}
