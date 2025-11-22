import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import LoginScreen from "../LoginScreen";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const renderLoginScreen = () => {
  return render(
    <BrowserRouter>
      <LoginScreen />
    </BrowserRouter>
  );
};

describe("LoginScreen Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  describe("Rendering", () => {
    test("renders login form with all elements", () => {
      renderLoginScreen();

      expect(screen.getByText("HealthCare Portal")).toBeInTheDocument();
      expect(
        screen.getByText("Wellness & Preventive Care")
      ).toBeInTheDocument();
      expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign in/i })
      ).toBeInTheDocument();
    });

    test("renders forgot password link", () => {
      renderLoginScreen();
      expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    });

    test("renders create account link", () => {
      renderLoginScreen();
      expect(screen.getByText("Create Account")).toBeInTheDocument();
    });

    test("renders SSO buttons", () => {
      renderLoginScreen();
      expect(
        screen.getByRole("button", { name: /google/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /apple/i })
      ).toBeInTheDocument();
    });
  });

  describe("Email Input Validation", () => {
    test("shows error for empty email", async () => {
      renderLoginScreen();
      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole("button", { name: /sign in/i });

      fireEvent.blur(emailInput);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Email is required")).toBeInTheDocument();
      });
    });

    test("shows error for invalid email format", async () => {
      renderLoginScreen();
      const emailInput = screen.getByLabelText(/email address/i);

      await userEvent.type(emailInput, "invalid-email");
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText("Invalid email address")).toBeInTheDocument();
      });
    });

    test("accepts valid email format", async () => {
      renderLoginScreen();
      const emailInput = screen.getByLabelText(/email address/i);

      await userEvent.type(emailInput, "test@test.com");
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(
          screen.queryByText("Invalid email address")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Password Input Validation", () => {
    test("shows error for empty password", async () => {
      renderLoginScreen();
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /sign in/i });

      fireEvent.blur(passwordInput);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Password is required")).toBeInTheDocument();
      });
    });

    test("shows error for password less than 8 characters", async () => {
      renderLoginScreen();
      const passwordInput = screen.getByLabelText(/password/i);

      await userEvent.type(passwordInput, "short");
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(
          screen.getByText("Password must be at least 8 characters")
        ).toBeInTheDocument();
      });
    });

    test("accepts password with 8 or more characters", async () => {
      renderLoginScreen();
      const passwordInput = screen.getByLabelText(/password/i);

      await userEvent.type(passwordInput, "Test@12345");
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(
          screen.queryByText("Password must be at least 8 characters")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Password Visibility Toggle", () => {
    test("toggles password visibility", async () => {
      renderLoginScreen();
      const passwordInput = screen.getByLabelText(
        /password/i
      ) as HTMLInputElement;
      const toggleButton = screen.getByRole("button", { name: "" }); // Visibility toggle button

      // Initially password should be hidden
      expect(passwordInput.type).toBe("password");

      // Click to show password
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(passwordInput.type).toBe("text");
      });

      // Click to hide password again
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(passwordInput.type).toBe("password");
      });
    });
  });

  describe("Form Submission", () => {
    test("submits form with valid credentials", async () => {
      renderLoginScreen();
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /sign in/i });

      await userEvent.type(emailInput, "test@test.com");
      await userEvent.type(passwordInput, "Test@12345");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(localStorage.getItem("isAuthenticated")).toBe("true");
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
      });
    });

    test("shows error for invalid credentials", async () => {
      renderLoginScreen();
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /sign in/i });

      await userEvent.type(emailInput, "wrong@test.com");
      await userEvent.type(passwordInput, "WrongPassword");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
        expect(localStorage.getItem("isAuthenticated")).toBeNull();
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });

    test("does not submit form with validation errors", async () => {
      renderLoginScreen();
      const submitButton = screen.getByRole("button", { name: /sign in/i });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Email is required")).toBeInTheDocument();
        expect(screen.getByText("Password is required")).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  });

  describe("Navigation", () => {
    test("navigates to registration page when create account is clicked", async () => {
      renderLoginScreen();
      const createAccountLink = screen.getByText("Create Account");

      fireEvent.click(createAccountLink);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/register");
      });
    });
  });

  describe("Accessibility", () => {
    test("email input has proper label", () => {
      renderLoginScreen();
      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute("type", "email");
    });

    test("password input has proper label", () => {
      renderLoginScreen();
      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toHaveAttribute("type", "password");
    });

    test("submit button is accessible", () => {
      renderLoginScreen();
      const submitButton = screen.getByRole("button", { name: /sign in/i });
      expect(submitButton).toHaveAttribute("type", "submit");
    });
  });
});
