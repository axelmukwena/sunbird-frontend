"use client";

import { Eye, EyeClosed } from "lucide-react";
import { FC, Fragment, useState } from "react";
import { FormProvider } from "react-hook-form";

import { GoogleIcon } from "@/components/icons/google";
import { TextField } from "@/components/inputs/text";
import { Spinner } from "@/components/loaders/spinner";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormRow } from "@/components/ui/form";
import { useLoginCreate } from "@/forms/login/hooks/create";
import { useLoginForm } from "@/forms/login/hooks/form";
import { ClientPathname } from "@/types/paths";

export const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const formHook = useLoginForm();
  const { isSubmitting, control, handleOnSubmit, handleOnEnter } =
    useLoginCreate({
      formHook,
    });

  return (
    <FormProvider {...formHook.hook}>
      <Form onSubmit={handleOnSubmit} onKeyDown={handleOnEnter}>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <FormRow>
              <FormField
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    field={field}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    label="Email"
                    autocomplete="email"
                    required
                  />
                )}
              />
            </FormRow>
            <div className="flex flex-col items-center w-full gap-2">
              <FormRow>
                <FormField
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      field={field}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      label="Password"
                      autocomplete="current-password"
                      type={showPassword ? "text" : "password"}
                      required
                      rightIcon={
                        <Button
                          type="button"
                          onClick={(): void => setShowPassword(!showPassword)}
                          className="rounded-2 h-8 w-8"
                          variant="ghost"
                        >
                          {showPassword ? (
                            <Eye className="h-4 w-4" size={20} />
                          ) : (
                            <EyeClosed className="h-4 w-4" size={20} />
                          )}
                        </Button>
                      }
                    />
                  )}
                />
              </FormRow>
              <a
                href={ClientPathname.FORGOT_PASSWORD}
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {!isSubmitting ? (
                "Login"
              ) : (
                <Fragment>
                  <Spinner className="mr-2 h-4 w-4" /> Logging in
                </Fragment>
              )}
            </Button>
          </div>

          <div className="hidden after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>

          <div className="hidden flex-col gap-4">
            <Button variant="outline" className="w-full">
              <div className="flex items-center justify-center gap-2">
                <GoogleIcon width={16} height={16} />
                Login with Google
              </div>
            </Button>
          </div>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              href={ClientPathname.SIGNUP}
              className="underline underline-offset-4"
            >
              Sign up
            </a>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
};
