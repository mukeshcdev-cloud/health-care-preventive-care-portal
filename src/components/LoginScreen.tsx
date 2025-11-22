import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Divider,
  Container,
  Alert,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  FavoriteBorder,
} from "@mui/icons-material";
import FloatingIcons from "./FloatingIcons";
import HeroIllustration from "./HeroIllustration";
import "./LoginScreen.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (values: { email: string; password: string }) => {
    // Fixed credentials check
    if (values.email === "test@test.com" && values.password === "Test@12345") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      setLoginError("Invalid credentials. Use test@test.com / Test@12345");
    }
  };

  return (
    <Box className="login-container">
      <FloatingIcons />

      <Container
        maxWidth="xl"
        sx={{ height: "100%", display: "flex", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: 4,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Hero Section */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HeroIllustration />
          </Box>

          {/* Login Card */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: "100%", maxWidth: 480 }}
            >
              <Card
                className="login-card"
                sx={{
                  p: 5,
                  borderRadius: 4,
                  boxShadow: "0 20px 60px rgba(0, 137, 123, 0.15)",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Logo */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Box
                    className="logo-container"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #00897B 0%, #0288D1 100%)",
                      mb: 2,
                      boxShadow: "0 8px 24px rgba(0, 137, 123, 0.3)",
                    }}
                  >
                    <FavoriteBorder sx={{ fontSize: 40, color: "white" }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, #00897B 0%, #0288D1 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 1,
                    }}
                  >
                    HealthCare Portal
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Wellness & Preventive Care
                  </Typography>
                </Box>

                {/* Welcome Text */}
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, mb: 1, textAlign: "center" }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 4, textAlign: "center" }}
                >
                  Sign in to access your wellness dashboard
                </Typography>

                {loginError && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {loginError}
                  </Alert>
                )}

                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  {({ errors, touched, values, handleChange, handleBlur }) => (
                    <Form>
                      {/* Email Input */}
                      <Field name="email">
                        {() => (
                          <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Email color="primary" />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ mb: 3 }}
                          />
                        )}
                      </Field>

                      {/* Password Input */}
                      <Field name="password">
                        {() => (
                          <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Lock color="primary" />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            sx={{ mb: 2 }}
                          />
                        )}
                      </Field>

                      {/* Forgot Password */}
                      <Box sx={{ textAlign: "right", mb: 3 }}>
                        <Link
                          href="#"
                          underline="hover"
                          sx={{
                            color: "primary.main",
                            fontWeight: 500,
                            fontSize: "0.875rem",
                          }}
                        >
                          Forgot Password?
                        </Link>
                      </Box>

                      {/* Login Button */}
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        type="submit"
                        sx={{
                          py: 1.5,
                          mb: 3,
                          background:
                            "linear-gradient(135deg, #00897B 0%, #0288D1 100%)",
                          boxShadow: "0 8px 24px rgba(0, 137, 123, 0.3)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #00695C 0%, #01579B 100%)",
                            boxShadow: "0 12px 32px rgba(0, 137, 123, 0.4)",
                          },
                        }}
                      >
                        Sign In
                      </Button>
                    </Form>
                  )}
                </Formik>

                {/* Divider */}
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>

                {/* SSO Buttons */}
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      py: 1.2,
                      borderColor: "#E0E0E0",
                      color: "text.primary",
                      "&:hover": {
                        borderColor: "primary.main",
                        backgroundColor: "rgba(0, 137, 123, 0.04)",
                      },
                    }}
                  >
                    <Box component="span" sx={{ mr: 1 }}>
                      🔍
                    </Box>
                    Google
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      py: 1.2,
                      borderColor: "#E0E0E0",
                      color: "text.primary",
                      "&:hover": {
                        borderColor: "primary.main",
                        backgroundColor: "rgba(0, 137, 123, 0.04)",
                      },
                    }}
                  >
                    <Box component="span" sx={{ mr: 1 }}>
                      🍎
                    </Box>
                    Apple
                  </Button>
                </Box>

                {/* Create Account */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{" "}
                    <Link
                      onClick={() => navigate("/register")}
                      underline="hover"
                      sx={{
                        color: "primary.main",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Create Account
                    </Link>
                  </Typography>
                </Box>
              </Card>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginScreen;
