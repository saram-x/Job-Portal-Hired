import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Import layout and route protection components
import AppLayout from "./layouts/app-layout";
import ProtectedRoute from "./components/protected-route";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

// Import all page components
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/landing";
import Onboarding from "./pages/onboarding";
import PostJob from "./pages/post-job";
import JobListing from "./pages/jobListing";
import MyJobs from "./pages/my-jobs";
import SavedJobs from "./pages/saved-jobs";
import JobPage from "./pages/job";

import "./App.css";

