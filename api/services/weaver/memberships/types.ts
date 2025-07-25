import { BasicApiResponse, ErrorApiResponse, OrderBy } from "../types/general";

// Enums
export enum MembershipStatus {
  PENDING = "pending",
  DECLINED = "declined",
  ACTIVE = "active",
  DEACTIVATED = "deactivated",
}

export enum MembershipAdminStatus {
  ACTIVE = "active",
  DEACTIVATED = "deactivated",
}

export enum MembershipInviteeStatus {
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

export enum MembershipRole {
  OWNER = "owner",
  ADMIN = "admin",
  MANAGER = "manager",
  MEMBER = "member",
  VIEWER = "viewer",
  CUSTOM = "custom",
}

export enum MembershipPermission {
  // Meeting permissions
  CREATE_MEETING = "meeting.create",
  VIEW_MEETING = "meeting.view",
  EDIT_MEETING = "meeting.edit",
  DELETE_MEETING = "meeting.delete",

  // Attendee permissions
  CREATE_ATTENDEE = "attendee.create",
  VIEW_ATTENDEE = "attendee.view",
  EDIT_ATTENDEE = "attendee.edit",
  DELETE_ATTENDEE = "attendee.delete",

  // Membership permissions
  CREATE_MEMBERSHIP = "membership.create",
  VIEW_MEMBERSHIP = "membership.view",
  EDIT_MEMBERSHIP = "membership.edit",
  DELETE_MEMBERSHIP = "membership.delete",

  // Analytics permissions
  VIEW_ANALYTICS = "analytics.view",
  EXPORT_ANALYTICS = "analytics.create",

  // Organisation permissions
  OWNER_ORGANISATION = "organisation.owner",
  VIEW_ORGANISATION = "organisation.view",
  EDIT_ORGANISATION = "organisation.edit",
  DELETE_ORGANISATION = "organisation.delete",
}

export enum MembershipSortBy {
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  ROLE = "role",
  STATUS = "status",
}

export enum ApiActionMembership {
  GET_FILTERED = "filtered",
  INVITE_USER = "",
  RESPOND_TO_INVITATION = "invitation",
  GET_BY_ID = "",
  UPDATE_PERMISSIONS = "permissions",
  UPDATE_STATUS = "status",
  DELETE = "",
}

// Base interfaces
export interface MembershipForeignKeys {
  user_id: string;
  organisation_id: string;
}

export interface MembershipBase {
  status: MembershipStatus;
  role: MembershipRole;
  permissions: MembershipPermission[];
}

export interface Membership extends MembershipForeignKeys, MembershipBase {
  id: string;
  created_at: string;
  updated_at: string | null;
  creator_id: string | null;
  updator_id: string | null;
}

// Request interfaces
export interface MembershipInviteCreate {
  first_name: string | null;
  last_name: string | null;
  user_email: string;
  role: MembershipRole;
  permissions: MembershipPermission[];
}

export interface MembershipPermissionsUpdate {
  role: MembershipRole;
  permissions: MembershipPermission[];
}

export interface MembershipAdminStatusUpdate {
  status: MembershipAdminStatus;
}

export interface MembershipInviteeStatusUpdate {
  status: MembershipInviteeStatus;
}

// Query interfaces
export interface MembershipQuery {
  user_ids?: string[] | null;
  statuses?: MembershipStatus[] | null;
  roles?: MembershipRole[] | null;
  permissions?: MembershipPermission[] | null;
  search?: string | null;
  sort_by?: MembershipSortBy;
  order_by?: OrderBy;
}

export interface MembershipParams {
  skip?: number;
  limit?: number;
}

// API Response types
export type GetMembershipsResponseApi = Membership[] | ErrorApiResponse;
export type GetMembershipResponseApi = Membership | ErrorApiResponse;
export type InviteUserResponseApi = Membership | ErrorApiResponse;
export type RespondToInvitationResponseApi = Membership | ErrorApiResponse;
export type UpdateMembershipPermissionsResponseApi =
  | Membership
  | ErrorApiResponse;
export type UpdateMembershipStatusResponseApi = Membership | ErrorApiResponse;
export type DeleteMembershipResponseApi = BasicApiResponse | ErrorApiResponse;

// Service props
export interface GetManyFilteredMembershipsProps {
  organisation_id: string;
  query: MembershipQuery;
  params: MembershipParams;
}

export interface InviteUserProps {
  organisation_id: string;
  data: MembershipInviteCreate;
}

export interface RespondToInvitationProps {
  organisation_id: string;
  data: MembershipInviteeStatusUpdate;
}

export interface GetByIdMembershipProps {
  organisation_id: string;
  id: string;
}

export interface UpdateMembershipPermissionsProps {
  organisation_id: string;
  id: string;
  data: MembershipPermissionsUpdate;
}

export interface UpdateMembershipStatusProps {
  organisation_id: string;
  id: string;
  data: MembershipAdminStatusUpdate;
}

export interface DeleteMembershipProps {
  organisation_id: string;
  id: string;
}

// Permission weight mapping for hierarchy validation
export const PERMISSION_WEIGHTS: Record<MembershipPermission, number> = {
  // Organisation permissions (highest level)
  [MembershipPermission.OWNER_ORGANISATION]: 100,
  [MembershipPermission.DELETE_ORGANISATION]: 90,
  [MembershipPermission.EDIT_ORGANISATION]: 80,
  [MembershipPermission.VIEW_ORGANISATION]: 10,

  // Membership permissions (high level - can affect other users)
  [MembershipPermission.DELETE_MEMBERSHIP]: 85,
  [MembershipPermission.EDIT_MEMBERSHIP]: 75,
  [MembershipPermission.CREATE_MEMBERSHIP]: 70,
  [MembershipPermission.VIEW_MEMBERSHIP]: 15,

  // Meeting permissions (medium level)
  [MembershipPermission.DELETE_MEETING]: 60,
  [MembershipPermission.EDIT_MEETING]: 50,
  [MembershipPermission.CREATE_MEETING]: 40,
  [MembershipPermission.VIEW_MEETING]: 10,

  // Attendee permissions (medium level)
  [MembershipPermission.DELETE_ATTENDEE]: 55,
  [MembershipPermission.EDIT_ATTENDEE]: 45,
  [MembershipPermission.CREATE_ATTENDEE]: 35,
  [MembershipPermission.VIEW_ATTENDEE]: 10,

  // Analytics permissions (lower level - read-only operations)
  [MembershipPermission.EXPORT_ANALYTICS]: 25,
  [MembershipPermission.VIEW_ANALYTICS]: 20,
};

// Default permissions for each role
export const DEFAULT_ROLE_PERMISSIONS: Record<
  MembershipRole,
  MembershipPermission[]
> = {
  [MembershipRole.OWNER]: [
    // Meeting permissions
    MembershipPermission.CREATE_MEETING,
    MembershipPermission.VIEW_MEETING,
    MembershipPermission.EDIT_MEETING,
    MembershipPermission.DELETE_MEETING,
    // Attendee permissions
    MembershipPermission.CREATE_ATTENDEE,
    MembershipPermission.VIEW_ATTENDEE,
    MembershipPermission.EDIT_ATTENDEE,
    MembershipPermission.DELETE_ATTENDEE,
    // Membership permissions
    MembershipPermission.CREATE_MEMBERSHIP,
    MembershipPermission.VIEW_MEMBERSHIP,
    MembershipPermission.EDIT_MEMBERSHIP,
    MembershipPermission.DELETE_MEMBERSHIP,
    // Analytics permissions
    MembershipPermission.VIEW_ANALYTICS,
    MembershipPermission.EXPORT_ANALYTICS,
    // Organisation permissions
    MembershipPermission.OWNER_ORGANISATION,
    MembershipPermission.VIEW_ORGANISATION,
    MembershipPermission.EDIT_ORGANISATION,
    MembershipPermission.DELETE_ORGANISATION,
  ],
  [MembershipRole.ADMIN]: [
    // Meeting permissions
    MembershipPermission.CREATE_MEETING,
    MembershipPermission.VIEW_MEETING,
    MembershipPermission.EDIT_MEETING,
    MembershipPermission.DELETE_MEETING,
    // Attendee permissions
    MembershipPermission.CREATE_ATTENDEE,
    MembershipPermission.VIEW_ATTENDEE,
    MembershipPermission.EDIT_ATTENDEE,
    MembershipPermission.DELETE_ATTENDEE,
    // Membership permissions
    MembershipPermission.CREATE_MEMBERSHIP,
    MembershipPermission.VIEW_MEMBERSHIP,
    MembershipPermission.EDIT_MEMBERSHIP,
    MembershipPermission.DELETE_MEMBERSHIP,
    // Analytics permissions
    MembershipPermission.VIEW_ANALYTICS,
    MembershipPermission.EXPORT_ANALYTICS,
    // Organisation permissions
    MembershipPermission.VIEW_ORGANISATION,
    MembershipPermission.EDIT_ORGANISATION,
  ],
  [MembershipRole.MANAGER]: [
    // Meeting permissions
    MembershipPermission.CREATE_MEETING,
    MembershipPermission.VIEW_MEETING,
    MembershipPermission.EDIT_MEETING,
    // Attendee permissions
    MembershipPermission.CREATE_ATTENDEE,
    MembershipPermission.VIEW_ATTENDEE,
    MembershipPermission.EDIT_ATTENDEE,
    // Membership permissions
    MembershipPermission.VIEW_MEMBERSHIP,
    MembershipPermission.EDIT_MEMBERSHIP,
    // Analytics permissions
    MembershipPermission.VIEW_ANALYTICS,
    MembershipPermission.EXPORT_ANALYTICS,
    // Organisation permissions
    MembershipPermission.VIEW_ORGANISATION,
  ],
  [MembershipRole.MEMBER]: [
    // Meeting permissions
    MembershipPermission.CREATE_MEETING,
    MembershipPermission.VIEW_MEETING,
    MembershipPermission.EDIT_MEETING,
    // Attendee permissions
    MembershipPermission.CREATE_ATTENDEE,
    MembershipPermission.VIEW_ATTENDEE,
    MembershipPermission.EDIT_ATTENDEE,
    // Membership permissions
    MembershipPermission.VIEW_MEMBERSHIP,
    // Organisation permissions
    MembershipPermission.VIEW_ORGANISATION,
  ],
  [MembershipRole.VIEWER]: [
    // Meeting permissions
    MembershipPermission.VIEW_MEETING,
    // Attendee permissions
    MembershipPermission.VIEW_ATTENDEE,
    // Membership permissions
    MembershipPermission.VIEW_MEMBERSHIP,
    // Analytics permissions
    MembershipPermission.VIEW_ANALYTICS,
    // Organisation permissions
    MembershipPermission.VIEW_ORGANISATION,
  ],
  [MembershipRole.CUSTOM]: [],
};
