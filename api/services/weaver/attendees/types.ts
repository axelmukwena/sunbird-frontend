import { ReactNode } from "react";

import { CustomFieldType, MeetingRelationship } from "../meetings/types";
import { OauthClient } from "../oauth/types";
import { OrganisationRelationship } from "../organisations/types";
import {
  BasicApiResponse,
  DatabaseStatus,
  ErrorApiResponse,
  OrderBy,
} from "../types/general";

// Enums
export enum AttendanceStatus {
  REGISTERED = "registered",
  CHECKED_IN = "checked_in",
  CHECKED_IN_LATE = "checked_in_late",
  CANCELLED = "cancelled",
}

export enum AttendeeSortBy {
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  EMAIL = "email",
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  ATTENDANCE_STATUS = "attendance_status",
  CHECKIN_DATETIME = "checkin.checkin_datetime",
}

export enum ApiActionAttendee {
  GET_FILTERED = "filtered",
  GET_BY_ID = "",
  REGISTER = "register",
  GUEST_CHECKIN = "checkin/public",
  GET_GUEST_BY_FINGERPRINT = "guest",
  UPDATE_GUEST_BY_FINGERPRINT = "guest",
  CANCEL_GUEST_BY_FINGERPRINT = "guest",
  UPDATE = "",
  DELETE = "",
  CANCEL = "cancel",
  SUBMIT_FEEDBACK = "feedback",
  SUBMIT_GUEST_FEEDBACK = "guest",
}

export interface AttendeeForeignKeys {
  organisation_id: string;
  meeting_id: string;
  user_id: string;
}

export interface AttendeeStatus {
  attendance_status: AttendanceStatus;
}

export interface AttendeeCheckinLocation {
  latitude: number;
  longitude: number;
  address: string;
  ip_address: string;
  accuracy: number;
  timestamp: string;
}

export interface AttendeeCheckinDevice {
  browser: string | null;
  os: string | null;
  device: string | null;
  user_agent: string;
  screen_resolution: string | null;
  timezone: string | null;
}

export interface AttendeeCheckinInfo {
  device_fingerprint: string;
  session_id: string;
  checkin_datetime: string;
  checkin_location: AttendeeCheckinLocation;
  checkin_device: AttendeeCheckinDevice | null;
}

export interface AttendeeFeedbackInfo {
  rating: number | null;
  comment: string | null;
  feedback_datetime: string | null;
}

export interface AttendeeCustomFieldResponse {
  customfield_id: string;
  field_name: string;
  field_type: CustomFieldType;
  value: ReactNode;
}

export interface AttendeeCheckin {
  checkin: AttendeeCheckinInfo | null;
}

export interface AttendeeFeedback {
  feedback: AttendeeFeedbackInfo | null;
}

export interface AttendeeBase {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  organisation_name: string | null;
  occupation: string | null;
  custom_field_responses: AttendeeCustomFieldResponse[] | null;
}

export interface AttendeeRelatives {
  organisation: OrganisationRelationship | null;
  meeting: MeetingRelationship | null;
}

export interface Attendee
  extends AttendeeForeignKeys,
    AttendeeBase,
    AttendeeStatus,
    AttendeeCheckin,
    AttendeeFeedback,
    AttendeeRelatives {
  id: string;
  created_at: string;
  updated_at: string | null;
  creator_id: string | null;
  updator_id: string | null;
  database_status: DatabaseStatus;
}

// Request interfaces
export interface AttendeeCheckinInfoCreate extends AttendeeCheckinInfo {}

export interface AttendeeCheckinCreate {
  checkin: AttendeeCheckinInfoCreate;
}

export interface AttendeeFeedbackInfoCreate extends AttendeeFeedbackInfo {}

export interface AttendeeFeedbackCreateInternal {
  feedback: AttendeeFeedbackInfoCreate | null;
}

export interface AttendeeBaseCreate extends AttendeeBase {
  meeting_id: string;
  user_id?: string | null;
}

export interface AttendeeCreate
  extends OauthClient,
    AttendeeBaseCreate,
    AttendeeCheckinCreate,
    AttendeeFeedbackCreateInternal {}

export interface AttendeeUpdate extends OauthClient, AttendeeBase {}

export interface AttendeeCancel {
  status: AttendanceStatus;
}

export interface AttendeeFeedbackCreate
  extends OauthClient,
    AttendeeFeedbackCreateInternal {}

// Query interfaces
export interface AttendeeQuery {
  meeting_ids?: string[] | null;
  user_ids?: string[] | null;
  attendance_statuses?: AttendanceStatus[] | null;
  database_statuses?: DatabaseStatus[] | null;
  has_checked_in?: boolean | null;
  has_feedback?: boolean | null;
  registered_from?: string | null;
  registered_to?: string | null;
  search?: string | null;
  sort_by?: AttendeeSortBy;
  order_by?: OrderBy;
}

export interface AttendeeParams {
  skip?: number;
  limit?: number;
}

export interface AttendeeUserStatisticsQuery {
  attendance_statuses?: AttendanceStatus[] | null;
  from_date?: string | null;
  to_date?: string | null;
}

export interface AttendeeUserStatistics {
  user_id: string;
  meetings_attended_count: number;
  unique_organisations_count: number;
  first_attendance_date: string | null;
  last_attendance_date: string | null;
}

// API Response types
export type GetAttendeesResponseApi = Attendee[] | ErrorApiResponse;
export type GetAttendeeResponseApi = Attendee | ErrorApiResponse;
export type RegisterAttendeeResponseApi = Attendee | ErrorApiResponse;
export type GuestCheckinResponseApi = Attendee | ErrorApiResponse;
export type GetGuestAttendeeResponseApi = Attendee | ErrorApiResponse;
export type UpdateGuestAttendeeResponseApi = Attendee | ErrorApiResponse;
export type CancelGuestAttendanceResponseApi = Attendee | ErrorApiResponse;
export type UpdateAttendeeResponseApi = Attendee | ErrorApiResponse;
export type DeleteAttendeeResponseApi = BasicApiResponse | ErrorApiResponse;
export type CancelAttendanceResponseApi = Attendee | ErrorApiResponse;
export type SubmitFeedbackResponseApi = Attendee | ErrorApiResponse;
export type SubmitGuestFeedbackResponseApi = Attendee | ErrorApiResponse;
export type GetAttendeeUserStatisticsResponseApi =
  | AttendeeUserStatistics
  | ErrorApiResponse;

// Service props
export interface GetManyFilteredAttendeesProps {
  organisation_id: string;
  query: AttendeeQuery;
  params: AttendeeParams;
}

export interface GetByIdAttendeeProps {
  organisation_id: string;
  id: string;
}

export interface RegisterAttendeeProps {
  organisation_id: string;
  data: AttendeeBaseCreate;
}

export interface GuestCheckinProps {
  organisation_id: string;
  data: AttendeeCreate;
}

export interface GetGuestAttendeeProps {
  organisation_id: string;
  device_fingerprint: string;
  params: OauthClient;
}

export interface UpdateGuestAttendeeProps {
  organisation_id: string;
  device_fingerprint: string;
  data: AttendeeUpdate;
}

export interface CancelGuestAttendanceProps {
  organisation_id: string;
  device_fingerprint: string;
  params: OauthClient;
}

export interface UpdateAttendeeProps {
  organisation_id: string;
  id: string;
  data: AttendeeUpdate;
}

export interface DeleteAttendeeProps {
  organisation_id: string;
  id: string;
}

export interface CancelAttendanceProps {
  organisation_id: string;
  id: string;
}

export interface SubmitFeedbackProps {
  organisation_id: string;
  id: string;
  data: AttendeeFeedbackCreate;
}

export interface SubmitGuestFeedbackProps {
  organisation_id: string;
  device_fingerprint: string;
  data: AttendeeFeedbackCreate;
}

export interface GetAttendeeUsersProps {
  user_id: string;
  query: AttendeeQuery;
  params: AttendeeParams;
}

export interface GetAttendeeUserProps {
  user_id: string;
  attendance_id: string;
}

export interface GetAttendeeUserStatisticsProps {
  user_id: string;
  query: AttendeeUserStatisticsQuery;
}
