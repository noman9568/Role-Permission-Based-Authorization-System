import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  Shield,
  UserCog,
  LogOut,
  Key,
  Building2,
  Code,
} from "lucide-react";

const AppSidebar = ({ setHeading }) => {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "super_admin" || user?.role === "admin";
  const iconClass =
  "flex items-center justify-center w-6 h-6 rounded-xl bg-blue-600 text-white border border-blue-200";


  return (
    <Sidebar className="pl-4 py-3">
      {/* Header */}
      <SidebarHeader>
        <h1 className="px-2 text-3xl font-bold text-red-700 mb-8">
          !Treat
        </h1>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent>
        <SidebarMenu className="gap-3">
          {isAdmin && (
            <SidebarMenuItem className="hover:bg-zinc-100 pl-1 rounded-l-xl">
              <SidebarMenuButton asChild tooltip="Super Admin Dashboard">
                <NavLink to="/user_overview" onClick={() => setHeading("User Overview")}>
                  <span className={iconClass}>
                    <Shield size={14}/>
                  </span>
                  <span className="text-sm">User Overview</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem className="hover:bg-zinc-100 pl-1 rounded-l-xl">
            <SidebarMenuButton asChild tooltip="Admins">
              <NavLink to="/users" onClick={() => setHeading("Users")}>
                  <span className={iconClass}>
                    <UserCog size={14}/>
                  </span>
                <span className="text-sm">Users</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="hover:bg-zinc-100 pl-1 rounded-l-xl">
            <SidebarMenuButton asChild tooltip="Role And Permission">
              <NavLink to="/role_permission" onClick={() => setHeading("Role And Permissions")}>
                <span className={iconClass}>
                  <Key size={14}/>
                </span>
                <span className="text-sm">Role and Permission</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenuItem className="hover:bg-zinc-100 pl-1 rounded-l-xl">
          <SidebarMenuButton asChild tooltip="Departments">
            <NavLink to="/departments" onClick={() => setHeading("Departments")}>
                <span className={iconClass}>
                  <Building2 size={14}/>
                </span>
              <span className="text-sm">Departments</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="hover:bg-zinc-100 pl-1 rounded-l-xl">
          <SidebarMenuButton asChild tooltip="Developer Details">
            <NavLink to="/developer" onClick={() => setHeading("Developer Details")}>
                <span className={iconClass}>
                  <Code size={14}/>
                </span>
              <span className="text-sm">Developer Details</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>

      </SidebarContent>
      

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenuButton
          onClick={logout}
          className="text-red-600 hover:text-red-600"
        >
          <LogOut />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
