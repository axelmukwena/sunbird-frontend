import { NextRequest, NextResponse } from "next/server";

import { AttendeeNoTokenService } from "@/api/services/weaver/attendees/notoken.service";
import {
  AttendeeUpdateGuest,
  AttendeeUpdateGuestClient,
} from "@/api/services/weaver/attendees/types";
import { OauthClient } from "@/api/services/weaver/oauth/types";
import { getHeadersNextRequest } from "@/api/utilities";
import { ENVIRONMENT_VARIABLES } from "@/utilities/constants/environment";
import { verifyCsrfToken } from "@/utilities/helpers/csrf";
import { getErrorMessage } from "@/utilities/helpers/errors";

type RouteParams = Promise<{
  organisationId: string;
  deviceFingerprint: string;
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
    const { organisationId, deviceFingerprint } = params;

    if (!organisationId || !deviceFingerprint) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing organisation ID or device fingerprint",
        },
        { status: 400 },
      );
    }

    const oauthParams = {
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
    };

    const headers = getHeadersNextRequest(req);
    const attendeeService = new AttendeeNoTokenService(headers);

    const requestResponse = await attendeeService.getGuestByFingerprint({
      organisation_id: organisationId,
      device_fingerprint: deviceFingerprint,
      params: oauthParams,
    });

    return NextResponse.json(requestResponse);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to get guest attendee: ${getErrorMessage(error)}`,
      },
      { status: 500 },
    );
  }
};

export const PUT = async (
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
    const { organisationId, deviceFingerprint } = params;
    const requestBody: AttendeeUpdateGuestClient = await req.json();

    if (!organisationId || !deviceFingerprint) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing organisation ID or device fingerprint",
        },
        { status: 400 },
      );
    }

    const updateData: AttendeeUpdateGuest = {
      ...requestBody,
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
    } satisfies AttendeeUpdateGuest;

    const oauthParams: OauthClient = {
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
    } satisfies OauthClient;

    const headers = getHeadersNextRequest(req);
    const attendeeService = new AttendeeNoTokenService(headers);

    const requestResponse = await attendeeService.updateGuestByFingerprint({
      organisation_id: organisationId,
      device_fingerprint: deviceFingerprint,
      data: updateData,
      params: oauthParams,
    });

    return NextResponse.json(requestResponse);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to update guest attendee: ${getErrorMessage(error)}`,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (
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
    const { organisationId, deviceFingerprint } = params;

    if (!organisationId || !deviceFingerprint) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing organisation ID or device fingerprint",
        },
        { status: 400 },
      );
    }

    const oauthParams: OauthClient = {
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
    } satisfies OauthClient;

    const headers = getHeadersNextRequest(req);
    const attendeeService = new AttendeeNoTokenService(headers);

    const requestResponse = await attendeeService.cancelGuestByFingerprint({
      organisation_id: organisationId,
      device_fingerprint: deviceFingerprint,
      params: oauthParams,
    });

    return NextResponse.json(requestResponse);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to cancel guest attendance: ${getErrorMessage(error)}`,
      },
      { status: 500 },
    );
  }
};
