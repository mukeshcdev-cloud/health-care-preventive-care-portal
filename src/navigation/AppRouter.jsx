/**
 * AppRouter Component
 *
 * Central routing configuration for the entire application.
 * Manages all routes including public and protected routes.
 *
 * Route Structure:
 * - Public Routes: Login, Register (accessible without authentication)
 * - Protected Routes: Dashboard, Profile, Settings (require authentication)
 *
 * How to Add New Routes:
 * 1. Add route path to src/navigation/routes.js
 * 2. Import the component
 * 3. Add a new <Route> element below
 * 4. Wrap with <ProtectedRoute> if authentication is required
 *
 * Example:
 * import NewPage from '../pages/NewPage';
 *
 * <Route
 *   path={ROUTES.NEW_PAGE}
 *   element={
 *     <ProtectedRoute>
 *       <NewPage />
 *     </ProtectedRoute>
 *   }
 * />
 */

import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import ProtectedRoute from "./ProtectedRoute";

// Import Page Components
import LoginScreen from "../components/LoginScreen";
import RegistrationScreen from "../components/RegistrationScreen";
import Dashboard from "../components/Dashboard";

// Import future pages here as you create them
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
// import Settings from '../pages/Settings';
// import WellnessDashboard from '../pages/WellnessDashboard';

const AppRouter = () => {
  return (
    <Routes>
      {/* ==================== PUBLIC ROUTES ==================== */}

      {/* Login Route */}
      <Route path={ROUTES.LOGIN} element={<LoginScreen />} />

      {/* Registration Route */}
      <Route path={ROUTES.REGISTER} element={<RegistrationScreen />} />

      {/* ==================== PROTECTED ROUTES ==================== */}

      {/* Dashboard Route - Main wellness dashboard */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Profile Route - User profile page */}
      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Settings Route - Application settings */}
      <Route
        path={ROUTES.SETTINGS}
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Wellness Dashboard Route - Detailed wellness metrics */}
      {/* Uncomment when WellnessDashboard component is created */}
      {/*
      <Route
        path={ROUTES.WELLNESS_DASHBOARD}
        element={
          <ProtectedRoute>
            <WellnessDashboard />
          </ProtectedRoute>
        }
      />
      */}

      {/* ==================== ADD MORE ROUTES HERE ==================== */}

      {/* Example: Appointments Route */}
      {/*
      <Route
        path={ROUTES.APPOINTMENTS}
        element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        }
      />
      */}

      {/* Example: Medical Records Route */}
      {/*
      <Route
        path={ROUTES.MEDICAL_RECORDS}
        element={
          <ProtectedRoute>
            <MedicalRecords />
          </ProtectedRoute>
        }
      />
      */}

      {/* ==================== FALLBACK ROUTES ==================== */}

      {/* Root Route - Redirect to login */}
      <Route
        path={ROUTES.HOME}
        element={<Navigate to={ROUTES.LOGIN} replace />}
      />

      {/* 404 Not Found - Redirect to login */}
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
};

export default AppRouter;
