# Healthcare Wellness Portal - Login & Registration Flow

## 🔐 Login Credentials

**Email:** `test@test.com`  
**Password:** `Test@12345`

## 🚀 Application Flow

### 1. Login Screen (`/login`)

- Enter the credentials above to access the dashboard
- Form validation using Formik + Yup
- Smooth animations with Framer Motion
- Click "Create Account" to go to registration

### 2. Registration Screen (`/register`)

- Complete registration form with all required fields:
  - Full Name
  - Mobile Number (10 digits)
  - Email Address
  - Date of Birth
  - Gender (Select)
  - Address
  - Blood Group (Select)
  - Marital Status (Select)
  - Emergency Contact (10 digits)
  - Privacy Policy Consent (Required)
- Full validation on all fields
- Redirects to login after successful registration

### 3. Dashboard (`/dashboard`)

- Protected route - requires authentication
- Displays wellness goals:
  - Steps taken (7,500 / 10,000)
  - Sleep hours (6.5h / 8h)
  - Hydration (1.5L / 2L)
  - Calories burned (420 / 500 kcal)
- Preventive care reminders
- Health tip of the day
- Logout option in user menu

## 🎨 Features

✅ Formik + Yup validation on all forms  
✅ Framer Motion animations  
✅ Material UI components  
✅ Protected routes  
✅ Responsive design  
✅ Healthcare-themed colors (teal, blue)  
✅ Smooth transitions between screens  
✅ Existing design preserved

## 🌐 Access the Application

**Local URL:** http://localhost:5175/

The application will automatically redirect to `/login` on first visit.
