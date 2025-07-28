"use client";

import React, { FC } from "react";
import { FormProvider } from "react-hook-form";

import { CodeField } from "@/components/inputs/codefield";
import { Spinner } from "@/components/loaders/spinner";
import { Button } from "@/components/ui/button";
import { Form, FormErrorMessage, FormField } from "@/components/ui/form";
import { useEmailVerificationConfirmForm } from "@/forms/profile/hooks/email-verification-confirm";

interface VerifyEmailFormProps {}

export const VerifyEmailForm: FC<VerifyEmailFormProps> = () => {
  const {
    hook,
    handleOnSubmit,
    handleOnEnter,
    isSubmitting,
    handleResendCode,
    isResending,
    errors,
  } = useEmailVerificationConfirmForm();

  return (
    <div className="w-full flex flex-col gap-6">
      <FormProvider {...hook}>
        <Form onSubmit={handleOnSubmit} onKeyDown={handleOnEnter}>
          <div className="space-y-6">
            <FormField
              control={hook.control}
              name="code"
              render={({ field }) => (
                <CodeField
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  length={6}
                  error={errors.code?.message}
                  className="mb-8"
                />
              )}
            />

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !!errors.code}
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>

              {errors.code && (
                <FormErrorMessage>{errors.code.message}</FormErrorMessage>
              )}
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Didn't receive a code or expired?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto font-medium text-primary"
                    onClick={handleResendCode}
                    disabled={isResending}
                  >
                    {isResending ? "Resending..." : "Resend code"}
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
};
