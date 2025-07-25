"use client";

import { Video } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ClientPathname } from "@/types/paths";

interface SignupFormData {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  organization_option: "create";
  organization_name: "";
  organization_industry: "";
  agree_terms: boolean;
}

interface SignupError {
  field?: string;
  message: string;
}

export const SignupView: FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    organization_option: "create",
    organization_name: "",
    organization_industry: "",
    agree_terms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<SignupError[]>([]);
  const [step, setStep] = useState<"personal" | "organization" | "complete">(
    "personal",
  );

  const router = useRouter();

  const validatePersonalInfo = (): SignupError[] => {
    const validationErrors: SignupError[] = [];

    if (!formData.email) {
      validationErrors.push({ field: "email", message: "Email is required" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.push({
        field: "email",
        message: "Please enter a valid email address",
      });
    }

    if (!formData.first_name) {
      validationErrors.push({
        field: "first_name",
        message: "First name is required",
      });
    }

    if (!formData.last_name) {
      validationErrors.push({
        field: "last_name",
        message: "Last name is required",
      });
    }

    if (!formData.password) {
      validationErrors.push({
        field: "password",
        message: "Password is required",
      });
    } else if (formData.password.length < 8) {
      validationErrors.push({
        field: "password",
        message: "Password must be at least 8 characters",
      });
    }

    if (!formData.confirm_password) {
      validationErrors.push({
        field: "confirm_password",
        message: "Please confirm your password",
      });
    } else if (formData.password !== formData.confirm_password) {
      validationErrors.push({
        field: "confirm_password",
        message: "Passwords do not match",
      });
    }

    return validationErrors;
  };

  const validateOrganization = (): SignupError[] => {
    const validationErrors: SignupError[] = [];

    if (formData.organization_option === "create") {
      if (!formData.organization_name) {
        validationErrors.push({
          field: "organization_name",
          message: "Organization name is required",
        });
      }
    }

    if (!formData.agree_terms) {
      validationErrors.push({
        field: "agree_terms",
        message: "You must agree to the terms and conditions",
      });
    }

    return validationErrors;
  };

  const handlePersonalNext = (): void => {
    const validationErrors = validatePersonalInfo();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    setStep("organization");
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const organizationErrors = validateOrganization();
    if (organizationErrors.length > 0) {
      setErrors(organizationErrors);
      return;
    }

    setIsLoading(true);
    setErrors([]);

    try {
      // Create user account
      const userResponse = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password,
          phone_number: formData.phone_number || null,
        }),
      });

      const userData = await userResponse.json();

      if (!userResponse.ok) {
        setErrors([
          { message: userData.message || "Failed to create account" },
        ]);
        return;
      }

      // Create organization if requested
      if (formData.organization_option === "create") {
        const orgResponse = await fetch("/api/organisations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.organization_name,
            industry: formData.organization_industry || null,
            creator_id: userData.data.user._id,
            settings: {
              require_location_for_checkin: true,
              allow_guest_checkin: true,
              default_meeting_duration: 3600, // 1 hour
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              date_format: "DD-MM-YYYY",
              time_format: "24-hour",
            },
          }),
        });

        if (!orgResponse.ok) {
          console.warn(
            "Failed to create organization, but user was created successfully",
          );
        }
      }

      // Send verification email
      try {
        await fetch("/api/auth/send-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userData.data.user.user_id,
          }),
        });
      } catch (error) {
        console.warn("Failed to send verification email:", error);
      }

      setStep("complete");

      // Auto-sign in after successful registration
      setTimeout(async () => {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.ok) {
          router.push("/dashboard");
          router.refresh();
        } else {
          // If auto-login fails, redirect to login page
          router.push(
            `${ClientPathname.LOGIN}?message=Account created successfully. Please sign in.`,
          );
        }
      }, 2000);
    } catch (error) {
      setErrors([
        { message: `An unexpected error occurred. Please try again. ${error}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof SignupFormData, value: any): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => prev.filter((error) => error.field !== field));
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find((error) => error.field === field)?.message;
  };

  const getGeneralErrors = (): string[] => {
    return errors.filter((error) => !error.field).map((error) => error.message);
  };

  if (step === "complete") {
    return (
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full sm:w-[400px] space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Video className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome to Tendiflow!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your account has been created successfully
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Account Created!</h3>
                <p className="text-sm text-gray-600">
                  We've sent a verification email to{" "}
                  <strong>{formData.email}</strong>. Please check your inbox and
                  verify your email address.
                </p>
                <p className="text-xs text-gray-500">
                  Redirecting you to your dashboard...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full sm:w-[500px] space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Video className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Join Tendiflow</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your account to get started with digital attendance
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center space-x-4">
          <div
            className={`flex items-center ${step === "personal" ? "text-blue-600" : "text-green-600"}`}
          >
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                step === "personal"
                  ? "border-blue-600 bg-blue-50"
                  : "border-green-600 bg-green-50"
              }`}
            >
              {step === "personal" ? "1" : "✓"}
            </div>
            <span className="ml-2 text-sm font-medium">Personal Info</span>
          </div>
          <div className="w-8 h-px bg-gray-300"></div>
          <div
            className={`flex items-center ${
              step === "organization"
                ? "text-blue-600"
                : step === "complete"
                  ? "text-green-600"
                  : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                step === "organization"
                  ? "border-blue-600 bg-blue-50"
                  : step === "complete"
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300"
              }`}
            >
              {step === "complete" ? "✓" : "2"}
            </div>
            <span className="ml-2 text-sm font-medium">Organization</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === "personal"
                ? "Create Your Account"
                : "Organization Setup"}
            </CardTitle>
            <CardDescription>
              {step === "personal"
                ? "Enter your personal information to get started"
                : "Set up your organization or join one later"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* General errors */}
            {getGeneralErrors().length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
                {getGeneralErrors().map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}

            {step === "personal" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input
                      id="first_name"
                      type="text"
                      value={formData.first_name}
                      onChange={(e) =>
                        updateFormData("first_name", e.target.value)
                      }
                      disabled={isLoading}
                      className={
                        getFieldError("first_name") ? "border-red-300" : ""
                      }
                    />
                    {getFieldError("first_name") && (
                      <span className="text-sm text-red-600">
                        {getFieldError("first_name")}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="last_name">Last Name *</Label>
                    <Input
                      id="last_name"
                      type="text"
                      value={formData.last_name}
                      onChange={(e) =>
                        updateFormData("last_name", e.target.value)
                      }
                      disabled={isLoading}
                      className={
                        getFieldError("last_name") ? "border-red-300" : ""
                      }
                    />
                    {getFieldError("last_name") && (
                      <span className="text-sm text-red-600">
                        {getFieldError("last_name")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    disabled={isLoading}
                    className={getFieldError("email") ? "border-red-300" : ""}
                  />
                  {getFieldError("email") && (
                    <span className="text-sm text-red-600">
                      {getFieldError("email")}
                    </span>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) =>
                      updateFormData("phone_number", e.target.value)
                    }
                    disabled={isLoading}
                    placeholder="Optional"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    disabled={isLoading}
                    className={
                      getFieldError("password") ? "border-red-300" : ""
                    }
                  />
                  {getFieldError("password") && (
                    <span className="text-sm text-red-600">
                      {getFieldError("password")}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    Must be at least 8 characters
                  </span>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="confirm_password">Confirm Password *</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    value={formData.confirm_password}
                    onChange={(e) =>
                      updateFormData("confirm_password", e.target.value)
                    }
                    disabled={isLoading}
                    className={
                      getFieldError("confirm_password") ? "border-red-300" : ""
                    }
                  />
                  {getFieldError("confirm_password") && (
                    <span className="text-sm text-red-600">
                      {getFieldError("confirm_password")}
                    </span>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={handlePersonalNext}
                  className="w-full"
                  disabled={isLoading}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === "organization" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col space-y-3">
                    <Label>What would you like to do?</Label>
                    <RadioGroup
                      value={formData.organization_option}
                      onValueChange={(value: "create" | "join_later") =>
                        updateFormData("organization_option", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="create" id="create" />
                        <Label htmlFor="create">
                          Create a new organization
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="join_later" id="join_later" />
                        <Label htmlFor="join_later">
                          I'll join an organization later
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.organization_option === "create" && (
                    <>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="organization_name">
                          Organization Name *
                        </Label>
                        <Input
                          id="organization_name"
                          type="text"
                          value={formData.organization_name}
                          onChange={(e) =>
                            updateFormData("organization_name", e.target.value)
                          }
                          disabled={isLoading}
                          placeholder="e.g., Acme Corporation"
                          className={
                            getFieldError("organization_name")
                              ? "border-red-300"
                              : ""
                          }
                        />
                        {getFieldError("organization_name") && (
                          <span className="text-sm text-red-600">
                            {getFieldError("organization_name")}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="organization_industry">Industry</Label>
                        <Input
                          id="organization_industry"
                          type="text"
                          value={formData.organization_industry}
                          onChange={(e) =>
                            updateFormData(
                              "organization_industry",
                              e.target.value,
                            )
                          }
                          disabled={isLoading}
                          placeholder="e.g., Technology, Healthcare, Education"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agree_terms"
                      checked={formData.agree_terms}
                      onCheckedChange={(checked) =>
                        updateFormData("agree_terms", !!checked)
                      }
                      className={
                        getFieldError("agree_terms") ? "border-red-300" : ""
                      }
                    />
                    <Label htmlFor="agree_terms" className="text-sm">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {getFieldError("agree_terms") && (
                    <span className="text-sm text-red-600">
                      {getFieldError("agree_terms")}
                    </span>
                  )}
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("personal")}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href={ClientPathname.LOGIN}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
