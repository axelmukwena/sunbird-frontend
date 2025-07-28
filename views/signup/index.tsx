"use client";

import { FC } from "react";

import { LogoVertical } from "@/components/logos/vertical";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalUrl } from "@/types/paths";

import { SignupForm } from "./form";

export const SignupView: FC = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-3">
                <LogoVertical wordWidth={110} showWord={false} />
              </div>
              <CardTitle className="text-xl">Join Tendiflow</CardTitle>
              <CardDescription>
                Create your Tendiflow account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking Signup, you agree to our{" "}
            <a href={ExternalUrl.TERMS_OF_SERVICE}>Terms of Service</a> and{" "}
            <a href={ExternalUrl.PRIVACY_POLICY}>Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};
