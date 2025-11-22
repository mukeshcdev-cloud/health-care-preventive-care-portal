/**
 * Route Constants
 *
 * Centralized route path definitions for the application.
 * Add new route paths here as your application grows.
 *
 * Usage:
 * import { ROUTES } from './navigation/routes';
 * navigate(ROUTES.DASHBOARD);
 */

export const ROUTES = {
  // Public Routes
  LOGIN: "/login",
  REGISTER: "/register",

  // Protected Routes
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  WELLNESS_DASHBOARD: "/wellness-dashboard",
  PROVIDER_DASHBOARD: "/provider",

  // Add more routes here as needed
  // APPOINTMENTS: '/appointments',
  // MEDICAL_RECORDS: '/medical-records',
  // HEALTH_REPORTS: '/health-reports',
  // NOTIFICATIONS: '/notifications',

  // Default/Fallback
  HOME: "/",
} as const;

/**
 * Route Metadata
 *
 * Optional: Add metadata for each route (title, permissions, etc.)
 */
export const ROUTE_METADATA = {
  [ROUTES.LOGIN]: {
    title: "Login",
    isPublic: true,
  },
  [ROUTES.REGISTER]: {
    title: "Register",
    isPublic: true,
  },
  [ROUTES.DASHBOARD]: {
    title: "Dashboard",
    isPublic: false,
    requiresAuth: true,
  },
  [ROUTES.PROFILE]: {
    title: "Profile",
    isPublic: false,
    requiresAuth: true,
  },
  [ROUTES.SETTINGS]: {
    title: "Settings",
    isPublic: false,
    requiresAuth: true,
  },
  [ROUTES.WELLNESS_DASHBOARD]: {
    title: "Wellness Dashboard",
    isPublic: false,
    requiresAuth: true,
  },
   [ROUTES.PROVIDER_DASHBOARD]: {
    title: "Provider Dashboard",
    isPublic: false,
    requiresAuth: true,
  },
};

export default ROUTES;
