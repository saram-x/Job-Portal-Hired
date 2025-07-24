import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Users, Briefcase, Shield, AlertTriangle } from "lucide-react";

// Admin sidebar navigation component
const AdminSidebar = ({ activeTab, setActiveTab, suspiciousJobsCount }) => {
  const menuItems = [
    {
      id: "users",
      label: "Users",
      icon: Users,
      activeClass: "bg-blue-600/20 text-blue-300 border border-blue-400/30 shadow-sm",
      hoverClass: "text-gray-300 hover:bg-gray-700/20 hover:text-white"
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: Briefcase,
      activeClass: "bg-blue-600/20 text-blue-300 border border-blue-400/30 shadow-sm",
      hoverClass: "text-gray-300 hover:bg-gray-700/20 hover:text-white"
    },
    {
      id: "suspicious",
      label: "Suspicious Jobs",
      icon: AlertTriangle,
      activeClass: "bg-orange-600/20 text-orange-300 border border-orange-400/30 shadow-sm",
      hoverClass: "text-gray-300 hover:bg-gray-700/20 hover:text-white",
      badge: suspiciousJobsCount > 0 ? suspiciousJobsCount : null
    }
  ];

  