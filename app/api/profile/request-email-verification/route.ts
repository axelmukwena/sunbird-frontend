import { NextRequest, NextResponse } from "next/server";

import { ProfileNoTokenService } from "@/api/services/weaver/profile/notoken.service";
import { EmailVerificationRequest } from "@/api/services/weaver/profile/types";
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

    const requestBody = await req.json();
    const requestData: EmailVerificationRequest = {
      ...requestBody,
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
    } satisfies EmailVerificationRequest;
    const headers = getHeadersNextRequest(req);
    const profileNoTokenService = new ProfileNoTokenService(headers);
    const requestResponse =
      await profileNoTokenService.requestEmailVerification({
        data: requestData,
      });
    return NextResponse.json(requestResponse);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to request email verification. ${getErrorMessage(error)}`,
      },
      { status: 500 },
    );
  }
};
