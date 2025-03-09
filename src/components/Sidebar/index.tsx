"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIsSidebarCollapsed } from "@/lib/features/global/globalSlice";
import {
    Archive,
    CircleDollarSign,
    Clipboard,
    Layout,
    LucideIcon,
    Menu,
    SlidersHorizontal,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed: boolean;
}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed,
}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive =
        pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href}>
            <div
                className={`cursor-pointer flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
                    }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? "bg-blue-200 " : ""
                    }
      }`}
            >
                <Icon className="w-6 h-6" />

                <span
                    className={`${isCollapsed ? "hidden" : "block"
                        } font-medium `}
                >
                    {label}
                </span>
            </div>
        </Link>
    );
};

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
    );

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    };

    return (
        <div className={cn(
            "fixed flex flex-col transition-all duration-300 overflow-hidden h-full shadow-md z-40 bg-sidebar text-sidebar-foreground",
            isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64")}>
            {/* TOP LOGO */}
            <div
                className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"
                    }`}
            >
                <div>Image</div>
                <h1
                    className={`${isSidebarCollapsed ? "hidden" : "block"
                        } font-extrabold text-2xl`}
                >
                    BRAGSOFT
                </h1>

                <button
                    className="md:hidden px-3 py-3 bg- rounded-full hover:bg-blue-100"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-4 h-4" />
                </button>
            </div>

            {/* LINKS */}
            <div className="flex-grow mt-8">
                <SidebarLink
                    href="/dashboard"
                    icon={Layout}
                    label="Dashboard"
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href="/inventory"
                    icon={Archive}
                    label="Inventory"
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href="/products"
                    icon={Clipboard}
                    label="Products"
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href="/users"
                    icon={User}
                    label="Users"
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href="/settings"
                    icon={SlidersHorizontal}
                    label="Settings"
                    isCollapsed={isSidebarCollapsed}
                />
                <SidebarLink
                    href="/expenses"
                    icon={CircleDollarSign}
                    label="Expenses"
                    isCollapsed={isSidebarCollapsed}
                />
            </div>

            {/* FOOTER */}
            <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
                <p className="text-center text-xs">&copy; 2024 Edstock</p>
            </div>
        </div>
    );
};

export default Sidebar;