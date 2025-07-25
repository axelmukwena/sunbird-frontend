import { deleteCookie, OptionsType } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import {
  getDomainNextRequestCookie,
  getSeureNextRequestCookie,
} from "@/api/utilities";
import { verifyCsrfToken } from "@/utilities/helpers/csrf";
import { CookieKey } from "@/utilities/helpers/enums";
import { getErrorMessage } from "@/utilities/helpers/errors";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const valid = await verifyCsrfToken(req);
  if (!valid) {
    return NextResponse.json(
      { success: false, message: "Authentication Error! Invalid CSRF token" },
      { status: 403 },
    );
  }

  try {
    const cookieOptions: OptionsType = {
      req,
      res: new NextResponse(),
      cookies,
      sameSite: "strict",
      secure: getSeureNextRequestCookie(),
      domain: getDomainNextRequestCookie(),
    };

    // Delete authentication cookies
    deleteCookie(CookieKey.TENDIFLOW_ID_TOKEN, cookieOptions);
    deleteCookie(CookieKey.TENDIFLOW_ID_TOKEN_EXPIRES_AT, cookieOptions);
    deleteCookie(CookieKey.TENDIFLOW_REFRESH_TOKEN, cookieOptions);

    // Respond with success
    return NextResponse.json(
      { success: true, message: "Successfully logged out." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to log out. ${getErrorMessage(error)}`,
      },
      { status: 500 },
    );
  }
};
