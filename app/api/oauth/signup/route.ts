import { NextRequest, NextResponse } from "next/server";

import { OauthService } from "@/api/services/weaver/oauth/service";
import { SignupRequest } from "@/api/services/weaver/oauth/types";
import { getHeadersNextRequest } from "@/api/utilities";
import { ENVIRONMENT_VARIABLES } from "@/utilities/constants/environment";
import { verifyCsrfToken } from "@/utilities/helpers/csrf";
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
    const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = ENVIRONMENT_VARIABLES;
    if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication Error! OAuth credentials are not set!",
        },
        { status: 500 },
      );
    }

    const signupBody = await req.json();
    const signupData: SignupRequest = {
      ...signupBody,
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
    } satisfies SignupRequest;
    const headers = getHeadersNextRequest(req);
    const oauthService = new OauthService(headers);
    const tokenResponse = await oauthService.signup({ data: signupData });
    return NextResponse.json(tokenResponse);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to sign in. ${getErrorMessage(error)}`,
      },
      { status: 500 },
    );
  }
};
