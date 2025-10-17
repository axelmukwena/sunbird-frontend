import { ErrorApiResponse, Language } from "../types/general";
import { User, UserKind, UserStatus } from "../users/types";

// Enums
export enum OauthTokenType {
  BEARER = "bearer",
}

export enum ApiActionOauth {
  SIGNUP = "signup",
  LOGIN = "login",
  TOKEN = "token",
  GOOGLE = "google",
}

// Base interfaces
export interface OauthTokenPayloadBase {
  sub: string;
  exp: number;
  iat: string;
}

export interface OauthIdTokenPayload extends OauthTokenPayloadBase {
  email: string;
  first_name: string;
  last_name: string;
  status: UserStatus;
  kind: UserKind;
  is_admin: boolean;
  is_superuser: boolean;
  email_verified: boolean;
}

export interface OauthRefreshTokenPayload extends OauthTokenPayloadBase {}

export interface OauthToken {
  id_token: string;
  expires_at: string;
  expires_in: number;
  refresh_token: string;
  token_type: OauthTokenType;
}

export interface OauthClient {
  client_id: string;
  client_secret: string;
}

// Request interfaces
export interface SignupRequestClient {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number?: string | null;
  avatar_url?: string | null;
  organisation_name?: string | null;
  division?: string | null;
  occupation?: string | null;
  language?: Language | null;
}
export interface SignupRequest extends OauthClient, SignupRequestClient {}

export interface LoginRequestClient {
  email: string;
  password: string;
}
export interface LoginRequest extends OauthClient, LoginRequestClient {}

export interface RefreshTokenRequestClient {
  refresh_token: string;
}
export interface RefreshTokenRequest
  extends OauthClient,
    RefreshTokenRequestClient {}

export interface GoogleLoginRequestClient {
  access_token: string;
}
export interface GoogleLoginRequest
  extends OauthClient,
    GoogleLoginRequestClient {}

// API Response types
export type SignupResponseApi = User | ErrorApiResponse;
export type LoginResponseApi = OauthToken | ErrorApiResponse;
export type RefreshTokenResponseApi = OauthToken | ErrorApiResponse;
export type GoogleLoginResponseApi = OauthToken | ErrorApiResponse;

// Service props
export interface SignupProps {
  data: SignupRequest;
}

export interface LoginProps {
  data: LoginRequest;
}

export interface RefreshTokenProps {
  data: RefreshTokenRequest;
}

export interface GoogleLoginProps {
  data: GoogleLoginRequest;
}
