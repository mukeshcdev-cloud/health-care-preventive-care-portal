# 🏥 Healthcare Wellness & Preventive Care Portal

A modern, responsive healthcare wellness portal built with React, TypeScript, Material UI, and Vite.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Access the application at: **http://localhost:5175/**

## 🔐 Login Credentials

```
Email: test@test.com
Password: Test@12345
```

## ✨ Features

### 🔒 Authentication System

- **Login Screen** - Formik + Yup validation, smooth animations
- **Registration Screen** - 10 validated fields with comprehensive form validation
- **Protected Routes** - Automatic authentication checks and redirects

### 📊 Dashboard

- **Wellness Goals Progress**
  - Steps tracking (circular progress indicators)
  - Sleep hours monitoring
  - Hydration tracking
  - Calories burned
- **Preventive Care Reminders** - Upcoming health checkups
- **Health Tip of the Day** - Daily wellness advice
- **User Menu** - Profile, Settings, Logout

### 🧭 Navigation System

- Modular folder-based routing
- Protected route authentication
- Easy to add new routes
- TypeScript route constants

### 🎨 Design

- Material UI components
- Healthcare color theme (teal, blue, white)
- Framer Motion animations
- Glassmorphism effects
- Responsive layout
- Floating healthcare icons

## 📁 Project Structure

```
src/
├── navigation/              # Navigation module
│   ├── AppRouter.jsx       # Route configuration
│   ├── ProtectedRoute.jsx  # Auth wrapper
│   ├── routes.ts           # Route constants
│   └── README.md           # Navigation docs
│
├── pages/                   # Page components
│   ├── Profile.tsx
│   └── Settings.tsx
│
├── components/              # UI components
│   ├── LoginScreen.tsx
│   ├── RegistrationScreen.tsx
│   ├── Dashboard.tsx
│   ├── FloatingIcons.tsx
│   ├── HeroIllustration.tsx
│   └── CircularProgressWithLabel.tsx
│
├── App.tsx                  # Root component
└── main.tsx                 # Entry point
```

## 🗺️ Available Routes

### Public Routes

- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Require Authentication)

- `/dashboard` - Main wellness dashboard
- `/profile` - User profile
- `/settings` - Application settings

## 📝 Registration Form Fields

All fields validated with Formik + Yup:

1. Full Name (min 3 characters)
2. Mobile Number (10 digits)
3. Email Address (valid email format)
4. Date of Birth (cannot be future)
5. Gender (Select: Male/Female/Other)
6. Address (min 10 characters)
7. Blood Group (Select: A+, A-, B+, B-, AB+, AB-, O+, O-)
8. Marital Status (Select: Single/Married/Divorced/Widowed)
9. Emergency Contact (10 digits)
10. Privacy Policy Consent (Required checkbox)

## 🔧 Adding New Routes

### Step 1: Add Route Constant

Edit `src/navigation/routes.ts`:

```typescript
export const ROUTES = {
  // ... existing routes
  NEW_PAGE: "/new-page",
};
```

### Step 2: Create Component

Create `src/pages/NewPage.tsx`:

```typescript
const NewPage = () => {
  return <div>New Page Content</div>;
};
export default NewPage;
```

### Step 3: Add to Router

Edit `src/navigation/AppRouter.jsx`:

```javascript
import NewPage from "../pages/NewPage";

<Route
  path={ROUTES.NEW_PAGE}
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>;
```

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **UI Library:** Material UI 7
- **Routing:** React Router DOM 6
- **Form Management:** Formik
- **Validation:** Yup
- **Animations:** Framer Motion
- **State Management:** localStorage (expandable to Redux/Context)

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^6.x",
  "@mui/material": "^7.3.5",
  "@mui/icons-material": "^7.3.5",
  "formik": "^2.x",
  "yup": "^1.x",
  "framer-motion": "^11.x"
}
```

## 🎯 User Flow

1. **Visit App** → Redirects to `/login`
2. **Login** → Enter credentials → Redirects to `/dashboard`
3. **Dashboard** → View wellness metrics, reminders, health tips
4. **Navigation** → Click avatar → Access Profile/Settings/Logout
5. **Logout** → Clears authentication → Returns to `/login`

## 🔒 Authentication Flow

### Login

1. User enters credentials
2. Formik validates input
3. Check against fixed credentials (test@test.com / Test@12345)
4. If valid: Set `localStorage.setItem('isAuthenticated', 'true')`
5. Navigate to dashboard

### Protected Routes

1. User tries to access protected route
2. `ProtectedRoute` checks `localStorage.getItem('isAuthenticated')`
3. If authenticated → Show page
4. If not authenticated → Redirect to `/login`

### Logout

1. User clicks logout
2. Remove `localStorage.removeItem('isAuthenticated')`
3. Navigate to `/login`

## 🎨 Design Features

- **Color Palette:**

  - Primary: Teal (#00897B)
  - Secondary: Blue (#0288D1)
  - Background: Light Teal (#F0F7F7)

- **Animations:**

  - Fade-in effects
  - Smooth page transitions
  - Hover effects on cards
  - Floating healthcare icons
  - Animated progress indicators

- **UI Elements:**
  - Glassmorphism cards
  - Gradient backgrounds
  - Rounded corners (16px)
  - Soft shadows
  - Material UI elevation

## 📚 Documentation

- `src/navigation/README.md` - Detailed navigation guide
- `LOGIN_CREDENTIALS.md` - Login credentials reference
- `NAVIGATION_SETUP_GUIDE.md` - Navigation setup guide
- `ROUTE_STRUCTURE.md` - Visual route map

## 🧪 Testing

### Test Login Flow

1. Visit http://localhost:5175/
2. Should redirect to `/login`
3. Enter: test@test.com / Test@12345
4. Should redirect to `/dashboard`

### Test Protected Routes

1. Logout from dashboard
2. Try accessing http://localhost:5175/dashboard directly
3. Should redirect to `/login`
4. Login again
5. Should now access dashboard

### Test Navigation

1. Login to dashboard
2. Click avatar in top-right
3. Click "Profile" → Should navigate to `/profile`
4. Click "Settings" → Should navigate to `/settings`
5. Click "Logout" → Should return to `/login`

## 🚀 Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 🔮 Future Enhancements

- [ ] Implement Profile page features
- [ ] Implement Settings page features
- [ ] Add Appointments page
- [ ] Add Medical Records page
- [ ] Add Health Reports page
- [ ] JWT token authentication
- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Data visualization charts
- [ ] Export health reports

## 📄 License

This project is private and proprietary.

## 👥 Contributors

Healthcare Wellness Portal Team

---

**Built with ❤️ for better health and wellness**
