import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Link,
  Alert,
} from "@mui/material";
import { FavoriteBorder, ArrowBack } from "@mui/icons-material";
import FloatingIcons from "./FloatingIcons";
import "./LoginScreen.css";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  dob: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
  bloodGroup: Yup.string().required("Blood group is required"),
  maritalStatus: Yup.string().required("Marital status is required"),
  emergencyContact: Yup.string()
    .matches(/^[0-9]{10}$/, "Emergency contact must be 10 digits")
    .required("Emergency contact is required"),
  consent: Yup.boolean()
    .oneOf([true], "You must accept the privacy policy")
    .required("Consent is required"),
});

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = (values: any) => {
    console.log("Registration data:", values);
    setSuccessMessage("Registration successful! Redirecting to login...");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Box className="login-container">
      <FloatingIcons />

      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            {/* Back Button */}
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/login")}
              sx={{ mb: 2, color: "primary.main" }}
            >
              Back to Login
            </Button>

            {/* Logo */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                className="logo-container"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #00897B 0%, #0288D1 100%)",
                  mb: 2,
                  boxShadow: "0 8px 24px rgba(0, 137, 123, 0.3)",
                }}
              >
                <FavoriteBorder sx={{ fontSize: 35, color: "white" }} />
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
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join our wellness community today
              </Typography>
            </Box>

            {successMessage && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {successMessage}
              </Alert>
            )}

            <Formik
              initialValues={{
                fullName: "",
                mobileNumber: "",
                email: "",
                dob: "",
                gender: "",
                address: "",
                bloodGroup: "",
                maritalStatus: "",
                emergencyContact: "",
                consent: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({
                errors,
                touched,
                values,
                handleChange,
                handleBlur,
                setFieldValue,
              }) => (
                <Form>
                  <Box sx={{ display: "grid", gap: 3 }}>
                    {/* Full Name */}
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.fullName && Boolean(errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    />

                    {/* Mobile Number & Email */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 3,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Mobile Number"
                        name="mobileNumber"
                        value={values.mobileNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.mobileNumber && Boolean(errors.mobileNumber)
                        }
                        helperText={touched.mobileNumber && errors.mobileNumber}
                      />
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
                      />
                    </Box>

                    {/* DOB & Gender */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 3,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.dob && Boolean(errors.dob)}
                        helperText={touched.dob && errors.dob}
                        InputLabelProps={{ shrink: true }}
                      />
                      <FormControl
                        fullWidth
                        error={touched.gender && Boolean(errors.gender)}
                      >
                        <InputLabel>Gender</InputLabel>
                        <Select
                          name="gender"
                          value={values.gender}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Gender"
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                        {touched.gender && errors.gender && (
                          <FormHelperText>{errors.gender}</FormHelperText>
                        )}
                      </FormControl>
                    </Box>

                    {/* Address */}
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      multiline
                      rows={2}
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />

                    {/* Blood Group & Marital Status */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 3,
                      }}
                    >
                      <FormControl
                        fullWidth
                        error={touched.bloodGroup && Boolean(errors.bloodGroup)}
                      >
                        <InputLabel>Blood Group</InputLabel>
                        <Select
                          name="bloodGroup"
                          value={values.bloodGroup}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Blood Group"
                        >
                          <MenuItem value="A+">A+</MenuItem>
                          <MenuItem value="A-">A-</MenuItem>
                          <MenuItem value="B+">B+</MenuItem>
                          <MenuItem value="B-">B-</MenuItem>
                          <MenuItem value="AB+">AB+</MenuItem>
                          <MenuItem value="AB-">AB-</MenuItem>
                          <MenuItem value="O+">O+</MenuItem>
                          <MenuItem value="O-">O-</MenuItem>
                        </Select>
                        {touched.bloodGroup && errors.bloodGroup && (
                          <FormHelperText>{errors.bloodGroup}</FormHelperText>
                        )}
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={
                          touched.maritalStatus && Boolean(errors.maritalStatus)
                        }
                      >
                        <InputLabel>Marital Status</InputLabel>
                        <Select
                          name="maritalStatus"
                          value={values.maritalStatus}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Marital Status"
                        >
                          <MenuItem value="single">Single</MenuItem>
                          <MenuItem value="married">Married</MenuItem>
                          <MenuItem value="divorced">Divorced</MenuItem>
                          <MenuItem value="widowed">Widowed</MenuItem>
                        </Select>
                        {touched.maritalStatus && errors.maritalStatus && (
                          <FormHelperText>
                            {errors.maritalStatus}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>

                    {/* Emergency Contact */}
                    <TextField
                      fullWidth
                      label="Emergency Contact Number"
                      name="emergencyContact"
                      value={values.emergencyContact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.emergencyContact &&
                        Boolean(errors.emergencyContact)
                      }
                      helperText={
                        touched.emergencyContact && errors.emergencyContact
                      }
                    />

                    {/* Consent Checkbox */}
                    <FormControl
                      error={touched.consent && Boolean(errors.consent)}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="consent"
                            checked={values.consent}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            sx={{
                              color:
                                touched.consent && errors.consent
                                  ? "error.main"
                                  : "primary.main",
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            I agree to the{" "}
                            <Link href="#" sx={{ color: "primary.main" }}>
                              Privacy Policy
                            </Link>{" "}
                            and{" "}
                            <Link href="#" sx={{ color: "primary.main" }}>
                              Terms of Service
                            </Link>
                          </Typography>
                        }
                      />
                      {touched.consent && errors.consent && (
                        <FormHelperText>{errors.consent}</FormHelperText>
                      )}
                    </FormControl>

                    {/* Register Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      type="submit"
                      sx={{
                        py: 1.5,
                        mt: 2,
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
                      Create Account
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>

            {/* Already have account */}
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link
                  onClick={() => navigate("/login")}
                  underline="hover"
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RegistrationScreen;
