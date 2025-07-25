"use client";

import { ArrowLeft, CheckCircle, Video } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClientPathname } from "@/types/paths";

export const ResetPasswordView: FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.push(ClientPathname.FORGOT_PASSWORD);
    }
  }, [token, router]);

  const validateForm = (): string[] => {
    const validationErrors: string[] = [];

    if (!password) {
      validationErrors.push("Password is required");
    } else if (password.length < 8) {
      validationErrors.push("Password must be at least 8 characters long");
    }

    if (!confirmPassword) {
      validationErrors.push("Please confirm your password");
    } else if (password !== confirmPassword) {
      validationErrors.push("Passwords do not match");
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!token) {
      setErrors(["Invalid or missing reset token"]);
      return;
    }

    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch("/api/auth/password-reset", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          new_password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push(
            `${ClientPathname.LOGIN}?message=Password reset successfully. Please sign in with your new password.`,
          );
        }, 3000);
      } else {
        setErrors([data.message || "Failed to reset password"]);
      }
    } catch {
      setErrors(["An unexpected error occurred. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full sm:w-[400px] space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Video className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Password Reset Successful
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your password has been updated
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">All Set!</h3>
                <p className="text-sm text-gray-600">
                  Your password has been successfully reset. You can now sign in
                  with your new password.
                </p>
                <p className="text-xs text-gray-500">
                  Redirecting you to the sign in page...
                </p>

                <div className="pt-4">
                  <Button
                    onClick={() => router.push(ClientPathname.LOGIN)}
                    className="w-full"
                  >
                    Go to Sign In
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full sm:w-[400px] space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Video className="h-12 w-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Invalid Reset Link
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              This password reset link is invalid or has expired
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Please request a new password reset link.
                </p>

                <Button
                  onClick={() => router.push(ClientPathname.FORGOT_PASSWORD)}
                  className="w-full"
                >
                  Request New Reset Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full sm:w-[400px] space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Video className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password below
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Password</CardTitle>
            <CardDescription>
              Your new password must be at least 8 characters long
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}

              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                  disabled={isLoading}
                />
                <span className="text-xs text-gray-500">
                  Must be at least 8 characters
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Updating Password..." : "Update Password"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href={ClientPathname.LOGIN}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
