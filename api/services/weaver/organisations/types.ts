import {
  BasicApiResponse,
  DatabaseStatus,
  DataServiceResponse,
  ErrorApiResponse,
  OrderBy,
} from "../types/general";

// Enums
export enum OrganisationIndustry {
  TECHNOLOGY = "technology",
  HEALTHCARE = "healthcare",
  FINANCE = "finance",
  EDUCATION = "education",
  RETAIL = "retail",
  MANUFACTURING = "manufacturing",
  HOSPITALITY = "hospitality",
  REAL_ESTATE = "real_estate",
  CONSULTING = "consulting",
  OTHER = "other",
}

export enum OrganisationSettingsDateFormat {
  DD_MM_YYYY = "DD-MM-YYYY",
  MM_DD_YYYY = "MM-DD-YYYY",
  YYYY_MM_DD = "YYYY-MM-DD",
}

export enum OrganisationSettingsTimeFormat {
  TWELVE_HOUR = "12_hour",
  TWENTY_FOUR_HOUR = "24_hour",
}

export enum OrganisationSortBy {
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
  NAME = "name",
  INDUSTRY = "industry",
}

export enum ApiActionOrganisation {
  GET_FILTERED = "filtered",
  GET_FILTERED_MEMBER = "filtered-member",
  CREATE = "",
  GET_BY_ID = "",
  UPDATE = "",
  UPDATE_DATABASE_STATUS = "database-status",
  DELETE = "",
}

// Base interfaces
export interface WeaverFile {
  id: string;
  created_at: string;
  updated_at: string | null;
  creator_id: string | null;
  updator_id: string | null;
  blob_name: string;
  name: string;
  pathname: string;
  mime_type: string;
  size_bytes: number;
  position: number;
  notes: string | null;
}

export interface OrganisationAddress {
  street: string | null;
  city: string | null;
  state: string | null;
  country_code: string | null;
  postal_code: string | null;
}

export interface OrganisationContactInfo {
  email: string | null;
  phone_number: string | null;
}

export interface OrganisationSettings {
  require_location_for_checkin: boolean;
  allow_guest_checkin: boolean;
  default_meeting_duration: number;
  timezone: string;
  date_format: OrganisationSettingsDateFormat;
  time_format: OrganisationSettingsTimeFormat;
  allow_meeting_edit_after_start: boolean;
  allow_meeting_delete_after_start: boolean;
}

export interface OrganisationBase {
  name: string;
  description: string | null;
  website_url: string | null;
  industry: OrganisationIndustry;
  address: OrganisationAddress | null;
  contact_info: OrganisationContactInfo | null;
  settings: OrganisationSettings;
}

export interface OrganisationAvatar {
  avatar: WeaverFile | null;
}

export interface Organisation extends OrganisationBase, OrganisationAvatar {
  id: string;
  created_at: string;
  updated_at: string | null;
  creator_id: string | null;
  updator_id: string | null;
  database_status: DatabaseStatus;
}

// Request interfaces
export interface OrganisationAddressInput extends OrganisationAddress {}

export interface OrganisationContactInfoInput extends OrganisationContactInfo {}

export interface OrganisationCreate extends OrganisationBase {
  address: OrganisationAddressInput | null;
  contact_info: OrganisationContactInfoInput | null;
}

export interface OrganisationUpdate extends OrganisationBase {
  address: OrganisationAddressInput | null;
  contact_info: OrganisationContactInfoInput | null;
}

export interface OrganisationDatabaseStatusUpdate {
  database_status: DatabaseStatus;
}

// Query interfaces
export interface OrganisationQuery {
  ids?: string[] | null;
  database_statuses?: DatabaseStatus[] | null;
  industries?: OrganisationIndustry[] | null;
  country_codes?: string[] | null;
  cities?: string[] | null;
  search?: string | null;
  sort_by?: OrganisationSortBy;
  order_by?: OrderBy;
}

export interface OrganisationParams {
  skip?: number;
  limit?: number;
}

// API Response types
export type GetOrganisationsResponseApi = Organisation[] | ErrorApiResponse;
export type GetOrganisationResponseApi = Organisation | ErrorApiResponse;
export type CreateOrganisationResponseApi = Organisation | ErrorApiResponse;
export type UpdateOrganisationResponseApi = Organisation | ErrorApiResponse;
export type UpdateOrganisationDatabaseStatusResponseApi =
  | Organisation
  | ErrorApiResponse;
export type DeleteOrganisationResponseApi = BasicApiResponse | ErrorApiResponse;

// Service props
export interface GetManyFilteredOrganisationsProps {
  query: OrganisationQuery;
  params: OrganisationParams;
}

export interface CreateOrganisationProps {
  data: OrganisationCreate;
}

export interface GetByIdOrganisationProps {
  id: string;
}

export interface UpdateOrganisationProps {
  id: string;
  data: OrganisationUpdate;
}

export interface UpdateOrganisationDatabaseStatusProps {
  id: string;
  data: OrganisationDatabaseStatusUpdate;
}

export interface DeleteOrganisationProps {
  id: string;
}

// Hook interfaces
export interface UseCurrentOrganisation {
  currentOrganisation: Organisation | null;
  isLoading: boolean;
  error: string;
  mutateCurrentOrganisation: () => void;
}

export interface CurrentOrganisationContextType {
  currentOrganisation: Organisation | null;
  isLoading: boolean;
  error: string | null;
  mutateCurrentOrganisation: () => void;
}

export interface UseOrganisations {
  organisations: Organisation[];
  isLoading: boolean;
  error: string;
  handleMutateOrganisations: () => void;
}

export type OrganisationsManyResponse = DataServiceResponse<
  Organisation[] | null
> | null;
