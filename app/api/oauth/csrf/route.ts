import { NextResponse } from "next/server";

import {
  generateCsrfToken,
  setCsrfTokenCookie,
} from "@/utilities/helpers/csrf";

export const GET = async (): Promise<NextResponse> => {
  const res = new NextResponse();
  const newCsrfToken = generateCsrfToken();
  setCsrfTokenCookie(res, newCsrfToken);
  return NextResponse.json(
    { success: true, message: "Successfully generated CSRF token" },
    { status: 200 },
  );
};
