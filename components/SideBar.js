"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  User,
  Store,
  LogOut,
  Loader2,
  Sparkles,
  TrendingUp,
  Users,
  ShoppingBag,
  Zap,
  Crown,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { logoutAction } from "@/app/account/login/actions/logout";

function LogoutButton({ icon: Icon, title }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="flex items-center space-x-3 w-full text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 p-0 px-3 py-6  rounded-xl transition-all duration-300 group"
      disabled={pending}
      aria-label={pending ? "Logging out" : "Log out"}
    >
      <div className="p-1 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors duration-300">
        {pending ? (
          <Loader2 className="w-4 h-4 animate-spin text-red-600" />
        ) : (
          <Icon className="w-4 h-4 text-red-600" />
        )}
      </div>
      <span className="font-medium">{pending ? "Logging out..." : title}</span>
    </button>
  );
}

const menuItems = [
  {
    title: "Home",
    subtitle: "Manage Events",
    url: "/events",
    icon: Home,
    gradient: "from-red-500 to-rose-500",
    hoverGradient: "hover:from-red-50 hover:to-rose-50",
    textColor: "text-red-600",
    bgColor: "bg-red-100",
    hoverBg: "group-hover:bg-red-200",
  },
  {
    title: "Vendor Hub",
    subtitle: "Manage partners",
    url: "/vendors/list",
    icon: Store,
    gradient: "from-purple-500 to-pink-500",
    hoverGradient: "hover:from-purple-50 hover:to-pink-50",
    textColor: "text-purple-600",
    bgColor: "bg-purple-100",
    hoverBg: "group-hover:bg-purple-200",
  },
  {
    title: "Customer Base",
    subtitle: "User insights",
    url: "/customer/list",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    hoverGradient: "hover:from-blue-50 hover:to-cyan-50",
    textColor: "text-blue-600",
    bgColor: "bg-blue-100",
    hoverBg: "group-hover:bg-blue-200",
  },
  {
    title: "Logout",
    onClick: logoutAction,
    icon: LogOut,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const [state, formAction] = useFormState(logoutAction, {
    success: null,
    message: null,
  });
  

  useEffect(() => {
    if (state.success === false && state.message) {
      console.error("Logout error:", state.message);
    }
  }, [state.success, state.message]);

  return (
    <Sidebar className="border-r-0 shadow-xl bg-gradient-to-b from-slate-50 to-white ">
      <SidebarContent className="py-6 px-0 2">
        {/* Brand Header */}
        <div className="mb-3 px-2">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-600 bg-clip-text text-transparent">
                Go Silly
              </h1>
            </div>
          </div>
        </div>

        <SidebarGroup className={'p-0'}>
          <SidebarGroupContent className={"p-0"}>
            <SidebarMenu className="space-y-3 p-0">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    {item.onClick ? (
                      <form action={formAction}>
                        <LogoutButton icon={item.icon} title={item.title} />
                      </form>
                    ) : (
                      <Link
                        href={item.url}
                        className={`flex items-center space-x-3 p-3 py-6 rounded-xl transition-all duration-300 group ${item.hoverGradient} hover:${item.textColor} hover:shadow-lg hover:scale-[1.02] transform`}
                      >
                        <div
                          className={`p-2 rounded-lg ${item.bgColor} ${item.hoverBg} transition-colors duration-300`}
                        >
                          <item.icon className={`w-5 h-5 ${item.textColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-800 group-hover:text-inherit">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-xs text-slate-500 group-hover:text-inherit group-hover:opacity-80">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient}`}
                          ></div>
                        </div>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
