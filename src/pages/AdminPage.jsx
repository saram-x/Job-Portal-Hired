import React, { useEffect, useState } from "react";
import { useUser, useSession } from "@clerk/clerk-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";

// Import reusable admin components
import AdminSidebar from "@/components/admin/admin-sidebar";
import SectionHeader from "@/components/admin/section-header";
import AdminDataTable from "@/components/admin/admin-data-table";
import LoadingSpinner from "@/components/admin/loading-spinner";
import { createTableConfig } from "@/components/admin/table-config";
import { useAdminOperations } from "@/components/admin/use-admin-operations";

const AdminPage = () => {
  // State management for users, jobs, and UI controls
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [jobs, setJobs] = useState([]);
  const [searchJobs, setSearchJobs] = useState("");
  const [jobsLoading, setJobsLoading] = useState(false);
  
  const [suspiciousJobs, setSuspiciousJobs] = useState([]);
  const [cleanedJobs, setCleanedJobs] = useState(new Set());
  const [searchSuspicious, setSearchSuspicious] = useState("");
  const [suspiciousLoading, setSuspiciousLoading] = useState(false);
  
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("users");
  
  const { user, isLoaded } = useUser();
  const { session } = useSession();
  const { toast } = useToast();

  