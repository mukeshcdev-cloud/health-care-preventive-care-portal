import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import RegistrationScreen from "../RegistrationScreen";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const renderRegistrationScreen = () => {
  return render(
    <BrowserRouter>
      <RegistrationScreen />
    </BrowserRouter>
  );
};

describe("RegistrationScreen Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("Rendering", () => {
    test("renders registration form with all fields", () => {
      renderRegistrationScreen();

      expect(screen.getByText("Create Account")).toBeTruthy();
      expect(screen.getByLabelText(/full name/i)).toBeTruthy();
      expect(screen.getByLabelText(/mobile number/i)).toBeTruthy();
      expect(screen.getByLabelText(/email address/i)).toBeTruthy();
      expect(screen.getByLabelText(/date of birth/i)).toBeTruthy();
      expect(screen.getByLabelText(/gender/i)).toBeTruthy();
      expect(screen.getByLabelText(/address/i)).toBeTruthy();
      expect(screen.getByLabelText(/blood group/i)).toBeTruthy();
      expect(screen.getByLabelText(/marital status/i)).toBeTruthy();
      expect(screen.getByLabelText(/emergency contact/i)).toBeTruthy();
    });

    test("renders back to login button", () => {
      renderRegistrationScreen();
      expect(
        screen.getByRole("button", { name: /back to login/i })
      ).toBeTruthy();
    });

    test("renders privacy policy checkbox", () => {
      renderRegistrationScreen();
      expect(screen.getByText(/privacy policy/i)).toBeTruthy();
    });

    test("renders create account button", () => {
      renderRegistrationScreen();
      expect(
        screen.getByRole("button", { name: /create account/i })
      ).toBeTruthy();
    });
  });

  describe("Full Name Validation", () => {
    test("shows error for empty full name", async () => {
      renderRegistrationScreen();
      const nameInput = screen.getByLabelText(/full name/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });

      fireEvent.blur(nameInput);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Full name is required")).toBeTruthy();
      });
    });

    test("shows error for name less than 3 characters", async () => {
      renderRegistrationScreen();
      const nameInput = screen.getByLabelText(/full name/i);

      await userEvent.type(nameInput, "Jo");
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(
          screen.getByText("Name must be at least 3 characters")
        ).toBeTruthy();
      });
    });

    test("accepts valid full name", async () => {
      renderRegistrationScreen();
      const nameInput = screen.getByLabelText(/full name/i);

      await userEvent.type(nameInput, "John Doe");
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(
          screen.queryByText("Name must be at least 3 characters")
        ).toBeNull();
      });
    });
  });

  describe("Mobile Number Validation", () => {
    test("shows error for empty mobile number", async () => {
      renderRegistrationScreen();
      const mobileInput = screen.getByLabelText(/mobile number/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });

      fireEvent.blur(mobileInput);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Mobile number is required")).toBeTruthy();
      });
    });

    test("shows error for invalid mobile number format", async () => {
      renderRegistrationScreen();
      const mobileInput = screen.getByLabelText(/mobile number/i);

      await userEvent.type(mobileInput, "12345");
      fireEvent.blur(mobileInput);

      await waitFor(() => {
        expect(
          screen.getByText("Mobile number must be 10 digits")
        ).toBeTruthy();
      });
    });

    test("accepts valid 10-digit mobile number", async () => {
      renderRegistrationScreen();
      const mobileInput = screen.getByLabelText(/mobile number/i);

      await userEvent.type(mobileInput, "9876543210");
      fireEvent.blur(mobileInput);

      await waitFor(() => {
        expect(
          screen.queryByText("Mobile number must be 10 digits")
        ).toBeNull();
      });
    });
  });

  describe("Email Validation", () => {
    test("shows error for empty email", async () => {
      renderRegistrationScreen();
      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });

      fireEvent.blur(emailInput);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Email is required")).toBeTruthy();
      });
    });

    test("shows error for invalid email format", async () => {
      renderRegistrationScreen();
      const emailInput = screen.getByLabelText(/email address/i);

      await userEvent.type(emailInput, "invalid-email");
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText("Invalid email address")).toBeTruthy();
      });
    });

    test("accepts valid email", async () => {
      renderRegistrationScreen();
      const emailInput = screen.getByLabelText(/email address/i);

      await userEvent.type(emailInput, "test@example.com");
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.queryByText("Invalid email address")).toBeNull();
      });
    });
  });

  describe("Address Validation", () => {
    test("shows error for empty address", async () => {
      renderRegistrationScreen();
      const addressInput = screen.getByLabelText(/address/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });

      fireEvent.blur(addressInput);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Address is required")).toBeTruthy();
      });
    });

    test("shows error for address less than 10 characters", async () => {
      renderRegistrationScreen();
      const addressInput = screen.getByLabelText(/address/i);

      await userEvent.type(addressInput, "Short");
      fireEvent.blur(addressInput);

      await waitFor(() => {
        expect(
          screen.getByText("Address must be at least 10 characters")
        ).toBeTruthy();
      });
    });

    test("accepts valid address", async () => {
      renderRegistrationScreen();
      const addressInput = screen.getByLabelText(/address/i);

      await userEvent.type(addressInput, "123 Main Street, City");
      fireEvent.blur(addressInput);

      await waitFor(() => {
        expect(
          screen.queryByText("Address must be at least 10 characters")
        ).toBeNull();
      });
    });
  });

  describe("Emergency Contact Validation", () => {
    test("shows error for empty emergency contact", async () => {
      renderRegistrationScreen();
      const emergencyInput = screen.getByLabelText(/emergency contact/i);
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });

      fireEvent.blur(emergencyInput);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Emergency contact is required")).toBeTruthy();
      });
    });

    test("shows error for invalid emergency contact format", async () => {
      renderRegistrationScreen();
      const emergencyInput = screen.getByLabelText(/emergency contact/i);

      await userEvent.type(emergencyInput, "12345");
      fireEvent.blur(emergencyInput);

      await waitFor(() => {
        expect(
          screen.getByText("Emergency contact must be 10 digits")
        ).toBeTruthy();
      });
    });

    test("accepts valid emergency contact", async () => {
      renderRegistrationScreen();
      const emergencyInput = screen.getByLabelText(/emergency contact/i);

      await userEvent.type(emergencyInput, "9876543210");
      fireEvent.blur(emergencyInput);

      await waitFor(() => {
        expect(
          screen.queryByText("Emergency contact must be 10 digits")
        ).toBeNull();
      });
    });
  });

  describe("Consent Checkbox Validation", () => {
    test("shows error when consent is not checked", async () => {
      renderRegistrationScreen();
      const submitButton = screen.getByRole("button", {
        name: /create account/i,
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("You must accept the privacy policy")
        ).toBeTruthy();
      });
    });

    test("accepts when consent is checked", async () => {
      renderRegistrationScreen();
      const consentCheckbox = screen.getByRole("checkbox");

      fireEvent.click(consentCheckbox);

      await waitFor(() => {
        expect((consentCheckbox as HTMLInputElement).checked).toBe(true);
      });
    });
  });

  describe("Navigation", () => {
    test("navigates back to login when back button is clicked", () => {
      renderRegistrationScreen();
      const backButton = screen.getByRole("button", { name: /back to login/i });

      fireEvent.click(backButton);

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    test("navigates to login when sign in link is clicked", () => {
      renderRegistrationScreen();
      const signInLink = screen.getByText("Sign In");

      fireEvent.click(signInLink);

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
