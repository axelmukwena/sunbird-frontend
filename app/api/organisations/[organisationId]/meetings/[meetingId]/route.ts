import { NextRequest, NextResponse } from "next/server";

import { MeetingNoTokenService } from "@/api/services/weaver/meetings/notoken.service";
import { OauthClient } from "@/api/services/weaver/oauth/types";
import { getHeadersNextRequest } from "@/api/utilities";
import { ENVIRONMENT_VARIABLES } from "@/utilities/constants/environment";
import { verifyCsrfToken } from "@/utilities/helpers/csrf";
import { getErrorMessage } from "@/utilities/helpers/errors";

type RouteParams = Promise<{
  organisationId: string;
  meetingId: string;
}>;

interface RouteContext {
  params: RouteParams;
}

export const GET = async (
  req: NextRequest,
  context: RouteContext,
): Promise<NextResponse> => {
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

    const params = await context.params;
    const { organisationId, meetingId } = params;

    if (!organisationId || !meetingId) {
      return NextResponse.json(
        { success: false, message: "Missing organisation ID or meeting ID" },
        { status: 400 },
      );
    }

    const oauthParams: OauthClient = {
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
    } satisfies OauthClient;

    const headers = getHeadersNextRequest(req);
    const meetingsService = new MeetingNoTokenService(headers);

    const requestResponse = await meetingsService.get({
      organisation_id: organisationId,
      meeting_id: meetingId,
      params: oauthParams,
    });

    return NextResponse.json(requestResponse);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to get meeting: ${getErrorMessage(error)}`,
      },
      { status: 500 },
    );
  }
};
