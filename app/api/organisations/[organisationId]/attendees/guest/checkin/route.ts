import { NextRequest, NextResponse } from "next/server";

import { AttendeeNoTokenService } from "@/api/services/weaver/attendees/notoken.service";
import {
  AttendeeCreateGuest,
  AttendeeCreateGuestClient,
} from "@/api/services/weaver/attendees/types";
import { getHeadersNextRequest } from "@/api/utilities";
import { ENVIRONMENT_VARIABLES } from "@/utilities/constants/environment";
import { verifyCsrfToken } from "@/utilities/helpers/csrf";
import { getErrorMessage } from "@/utilities/helpers/errors";

type RouteParams = Promise<{
  organisationId: string;
}>;

interface RouteContext {
  params: RouteParams;
}

export const POST = async (
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
    const { organisationId } = params;
    const requestBody: AttendeeCreateGuestClient = await req.json();

    if (!organisationId) {
      return NextResponse.json(
        { success: false, message: "Missing organisation ID" },
        { status: 400 },
      );
    }

    const guestCheckinData: AttendeeCreateGuest = {
      ...requestBody,
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
    } satisfies AttendeeCreateGuest;

    const headers = getHeadersNextRequest(req);
    const attendeeService = new AttendeeNoTokenService(headers);

    const requestResponse = await attendeeService.guestCheckin({
      organisation_id: organisationId,
      data: guestCheckinData,
    });

    return NextResponse.json(requestResponse);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to check in guest: ${getErrorMessage(error)}`,
      },
      { status: 500 },
    );
  }
};
