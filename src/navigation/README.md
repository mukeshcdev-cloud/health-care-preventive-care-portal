# Navigation System Documentation

## 📁 Folder Structure

```
src/navigation/
├── AppRouter.jsx          # Main router configuration
├── ProtectedRoute.jsx     # Authentication wrapper
├── routes.js              # Route constants
├── index.js               # Module exports
└── README.md              # This file
```

## 🚀 Quick Start

### Using Routes in Your Components

```javascript
import { useNavigate } from "react-router-dom";
import { ROUTES } from "./navigation/routes";

function MyComponent() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return <button onClick={goToDashboard}>Go to Dashboard</button>;
}
```

### Adding a New Route

**Step 1:** Add route constant to `routes.js`

```javascript
export const ROUTES = {
  // ... existing routes
  MY_NEW_PAGE: "/my-new-page",
};
```

**Step 2:** Create your page component

```javascript
// src/pages/MyNewPage.tsx
const MyNewPage = () => {
  return <div>My New Page</div>;
};

export default MyNewPage;
```

**Step 3:** Add route to `AppRouter.jsx`

```javascript
// Import the component
import MyNewPage from "../pages/MyNewPage";

// Add the route
<Route
  path={ROUTES.MY_NEW_PAGE}
  element={
    <ProtectedRoute>
      <MyNewPage />
    </ProtectedRoute>
  }
/>;
```

## 📋 Available Routes

### Public Routes (No Authentication Required)

- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Authentication Required)

- `/dashboard` - Main wellness dashboard
- `/profile` - User profile page
- `/settings` - Application settings
- `/wellness-dashboard` - Detailed wellness metrics (placeholder)

## 🔒 Protected Routes

Protected routes automatically redirect unauthenticated users to the login page.

### How It Works

1. User tries to access `/dashboard`
2. `ProtectedRoute` checks `localStorage.getItem('isAuthenticated')`
3. If `true` → Show dashboard
4. If `false` → Redirect to `/login`

### Authentication Logic

Current implementation uses localStorage:

```javascript
// Login success
localStorage.setItem("isAuthenticated", "true");

// Logout
localStorage.removeItem("isAuthenticated");

// Check auth status
const isAuth = localStorage.getItem("isAuthenticated") === "true";
```

### Customizing Authentication

You can replace localStorage with:

**Option 1: Context API**

```javascript
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // ...
};
```

**Option 2: Redux**

```javascript
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // ...
};
```

**Option 3: JWT Token**

```javascript
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const isAuthenticated = token && !isTokenExpired(token);
  // ...
};
```

## 🎯 Route Metadata

Add metadata to routes for additional functionality:

```javascript
// routes.js
export const ROUTE_METADATA = {
  [ROUTES.DASHBOARD]: {
    title: "Dashboard",
    requiresAuth: true,
    permissions: ["user", "admin"],
  },
};
```

## 🔄 Navigation Methods

### Using useNavigate Hook

```javascript
import { useNavigate } from "react-router-dom";
import { ROUTES } from "./navigation/routes";

const navigate = useNavigate();

// Navigate to a route
navigate(ROUTES.DASHBOARD);

// Navigate with replace (no history entry)
navigate(ROUTES.LOGIN, { replace: true });

// Navigate back
navigate(-1);

// Navigate with state
navigate(ROUTES.PROFILE, { state: { userId: 123 } });
```

### Using Link Component

```javascript
import { Link } from "react-router-dom";
import { ROUTES } from "./navigation/routes";

<Link to={ROUTES.DASHBOARD}>Go to Dashboard</Link>;
```

## 📝 Examples

### Example 1: Adding an Appointments Page

**1. Add route constant:**

```javascript
// routes.js
export const ROUTES = {
  // ...
  APPOINTMENTS: "/appointments",
};
```

**2. Create component:**

```javascript
// src/pages/Appointments.tsx
const Appointments = () => {
  return (
    <div>
      <h1>My Appointments</h1>
      {/* Your appointments UI */}
    </div>
  );
};

export default Appointments;
```

**3. Add to router:**

```javascript
// AppRouter.jsx
import Appointments from "../pages/Appointments";

<Route
  path={ROUTES.APPOINTMENTS}
  element={
    <ProtectedRoute>
      <Appointments />
    </ProtectedRoute>
  }
/>;
```

### Example 2: Public About Page

**1. Add route:**

```javascript
// routes.js
ABOUT: '/about',
```

**2. Create component:**

```javascript
// src/pages/About.tsx
const About = () => {
  return <div>About Us</div>;
};
```

**3. Add to router (no ProtectedRoute):**

```javascript
// AppRouter.jsx
<Route path={ROUTES.ABOUT} element={<About />} />
```

## 🛠️ Advanced Features

### Role-Based Access Control

Extend `ProtectedRoute` for role-based access:

```javascript
const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};

// Usage
<Route
  path={ROUTES.ADMIN}
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  }
/>;
```

### Nested Routes

```javascript
<Route path={ROUTES.DASHBOARD} element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="reports" element={<Reports />} />
</Route>
```

### Route Parameters

```javascript
// routes.js
USER_PROFILE: "/user/:userId",
  (
    // AppRouter.jsx
    <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
  );

// In component
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { userId } = useParams();
  return <div>User ID: {userId}</div>;
};
```

## 🐛 Troubleshooting

### Issue: Routes not working

- Check that `<Router>` wraps `<AppRouter />` in App.tsx
- Verify route paths match exactly (case-sensitive)
- Check browser console for errors

### Issue: Protected route not redirecting

- Verify `isAuthenticated` value in localStorage
- Check ProtectedRoute logic
- Ensure ROUTES.LOGIN is correct

### Issue: 404 on refresh

- Configure your server to serve index.html for all routes
- Or use HashRouter instead of BrowserRouter

## 📚 Resources

- [React Router Documentation](https://reactrouter.com/)
- [React Router v6 Migration Guide](https://reactrouter.com/docs/en/v6/upgrading/v5)

## 🎉 Summary

This navigation system provides:

- ✅ Centralized route management
- ✅ Protected route authentication
- ✅ Easy route addition
- ✅ Clean, modular structure
- ✅ Production-ready code
- ✅ Comprehensive documentation

Happy coding! 🚀
