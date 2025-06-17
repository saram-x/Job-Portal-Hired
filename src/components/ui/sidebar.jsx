import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * SIMPLE SIDEBAR COMPONENTS
 * Lightweight sidebar components for admin panel
 * Replaces complex shadcn sidebar that was causing issues
 */

const SidebarProvider = ({ children, ...props }) => (
  <div {...props}>{children}</div>
)

const Sidebar = React.forwardRef(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn("w-72 border-r border-gray-600/30 bg-transparent/10 backdrop-blur-sm", className)}
    {...props}
  />
))
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 border-b border-gray-600/20 bg-transparent", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4", className)}
    {...props}
  />
))
