import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

// Authentication wrapper with role-based access control and redirects
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  // Show nothing while loading user data
  if (!isLoaded) return null;

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  const role = user?.unsafeMetadata?.role;

  