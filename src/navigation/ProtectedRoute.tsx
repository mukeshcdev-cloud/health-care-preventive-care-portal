/**
 * ProtectedRoute Component
 *
 * A wrapper component that protects routes from unauthorized access.
 * Checks if the user is authenticated before allowing access to protected pages.
 *
 * Authentication Logic:
 * - Checks localStorage for 'isAuthenticated' flag
 * - If not authenticated, redirects to login page
 * - If authenticated, renders the protected component
 *
 * Usage:
 * <Route
 *   path="/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   }
 * />
 */

import { Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
export const ProtectedRoute = ({ children }: any) => {
  /**
   * Check authentication status
   *
   * Current implementation uses localStorage.
   * You can replace this with:
   * - Context API (useAuth hook)
   * - Redux store
   * - Session storage
   * - JWT token validation
   */
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  /**
   * Optional: Add additional checks here
   * - Token expiration
   * - User role/permissions
   * - Email verification status
   */

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // If authenticated, render the protected component
  return children;
};
