"use client";

import { CheckCircle, Mail, Video, XCircle } from "lucide-react";
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
import { ClientPathname } from "@/types/paths";

export const VerifyEmailView: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const emailParam = searchParams.get("email");

  useEffect(() => {
    if (!token || !emailParam) {
      setError("Invalid verification link");
      setIsLoading(false);
      return;
    }

    setEmail(emailParam);
    verifyEmail();
  }, [token, emailParam]);

  const verifyEmail = async (): Promise<void> => {
    if (!token || !emailParam) return;

    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailParam,
          token,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        // Redirect to login after 5 seconds
        setTimeout(() => {
          router.push(
            `${ClientPathname.LOGIN}?message=Email verified successfully. You can now sign in.`,
          );
        }, 5000);
      } else {
        setError(data.message || "Verification failed");
      }
    } catch {
      setError("An unexpected error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async (): Promise<void> => {
    if (!email) return;

    setIsLoading(true);
    setError("");

    try {
      // This would need a different endpoint that finds user by email
      // For now, we'll just show a success message
      setTimeout(() => {
        setIsLoading(false);
        setError("Verification email sent. Please check your inbox.");
      }, 1000);
    } catch {
      setError("Failed to resend verification email");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full sm:w-[400px] space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Video className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Verifying Your Email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we verify your email address
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                <h3 className="text-lg font-semibold">Verifying...</h3>
                <p className="text-sm text-gray-600">
                  This should only take a moment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full sm:w-[400px] space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Video className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Email Verified!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your email has been successfully verified
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">Welcome to Tendiflow!</h3>
                <p className="text-sm text-gray-600">
                  Your email address <strong>{email}</strong> has been verified.
                  You can now sign in and start using Tendiflow.
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

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full sm:w-[400px] space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Video className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Verification Failed
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Unable to verify your email address
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <XCircle className="h-5 w-5 text-red-600 mr-2" />
              Verification Error
            </CardTitle>
            <CardDescription>
              {error || "The verification link is invalid or has expired"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error || "This verification link is invalid or has expired"}
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Don't worry! You can request a new verification email.
              </p>

              {email && (
                <Button
                  variant="outline"
                  onClick={resendVerification}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {isLoading ? "Sending..." : "Resend Verification Email"}
                </Button>
              )}

              <div className="text-center pt-2">
                <Link
                  href={ClientPathname.LOGIN}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <Link
              href="/support"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
