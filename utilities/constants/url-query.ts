import { OrderBy } from "@/api/services/weaver/types/general";
import { QueryParamKey, SelectOptionType } from "@/types/general";

import { PAGE_LIMIT_OPTIONS } from "./general";

export const QUERY_ORDER_BY_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Ascending", value: OrderBy.ASC },
  { name: "Descending", value: OrderBy.DESC },
];

export const QUERY_SORT_BY_ASSET_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortAssetBy.NAME },
  { name: "Asset Number", value: SortAssetBy.ASSET_NUMBER },
  { name: "Book Value", value: SortAssetBy.BOOK_VALUE },
  { name: "Cost Value", value: SortAssetBy.COST_VALUE },
  { name: "Warranty Start Date", value: SortAssetBy.WARRANTY_START_DATE },
  { name: "Warranty End Date", value: SortAssetBy.WARRANTY_END_DATE },
  { name: "Depreciation Rate", value: SortAssetBy.DEPRECIATION_RATE },
  { name: "Created At", value: SortAssetBy.CREATED_AT },
  { name: "Updated At", value: SortAssetBy.UPDATED_AT },
];

export const QUERY_SORT_BY_PARTNER_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortPartnerBy.NAME },
  { name: "Created At", value: SortPartnerBy.CREATED_AT },
  { name: "Updated At", value: SortPartnerBy.UPDATED_AT },
];

export const QUERY_SORT_BY_ASSETMODEL_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Model number", value: SortAssetmodelBy.MODEL_NUMBER },
  { name: "Name", value: SortAssetmodelBy.NAME },
  { name: "Created At", value: SortAssetmodelBy.CREATED_AT },
  { name: "Updated At", value: SortAssetmodelBy.UPDATED_AT },
];

export const QUERY_SORT_BY_DEPRECIATIONSETTING_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortDepreciationsettingBy.NAME },
  { name: "Created At", value: SortDepreciationsettingBy.CREATED_AT },
  { name: "Updated At", value: SortDepreciationsettingBy.UPDATED_AT },
];

export const QUERY_SORT_BY_KIT_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortKitBy.NAME },
  { name: "Created At", value: SortKitBy.CREATED_AT },
  { name: "Updated At", value: SortKitBy.UPDATED_AT },
];

export const QUERY_SORT_BY_CATEGORY_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortCategoryBy.NAME },
  { name: "Created At", value: SortCategoryBy.CREATED_AT },
  { name: "Updated At", value: SortCategoryBy.UPDATED_AT },
];

export const QUERY_SORT_BY_TAG_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortTagBy.NAME },
  { name: "Created At", value: SortTagBy.CREATED_AT },
  { name: "Updated At", value: SortTagBy.UPDATED_AT },
];

export const QUERY_SORT_BY_TASK_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortTaskBy.NAME },
  { name: "Created At", value: SortTaskBy.CREATED_AT },
  { name: "Updated At", value: SortTaskBy.UPDATED_AT },
];

export const QUERY_SORT_BY_CUSTOMFIELD_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortCustomfieldBy.NAME },
  { name: "Position", value: SortCustomfieldBy.POSITION },
  { name: "Created At", value: SortCustomfieldBy.CREATED_AT },
  { name: "Updated At", value: SortCustomfieldBy.UPDATED_AT },
];

export const QUERY_SORT_BY_LOCATION_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortLocationBy.NAME },
  { name: "Postal Code", value: SortLocationBy.POSTAL_CODE },
  { name: "City", value: SortLocationBy.CITY },
  { name: "Region", value: SortLocationBy.REGION },
  { name: "Country Iso Code", value: SortLocationBy.COUNTRY_ISO_CODE },
  { name: "Created At", value: SortLocationBy.CREATED_AT },
  { name: "Updated At", value: SortLocationBy.UPDATED_AT },
];

export const QUERY_SORT_BY_ASSIGNEE_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Contact Name", value: SortAssigneeBy.CONTACT_NAME },
  { name: "Company Name", value: SortAssigneeBy.COMPANY_NAME },
  { name: "Kind", value: SortAssigneeBy.KIND },
  { name: "Created At", value: SortAssigneeBy.CREATED_AT },
  { name: "Updated At", value: SortAssigneeBy.UPDATED_AT },
];

export const QUERY_SORT_BY_TRANSACTION_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Transaction Date", value: SortTransactionBy.TRANSACTION_DATE },
  { name: "Return Date", value: SortTransactionBy.RETURN_DATE },
  { name: "Created At", value: SortTransactionBy.CREATED_AT },
  { name: "Updated At", value: SortTransactionBy.UPDATED_AT },
];

export const QUERY_SORT_BY_DEPRECIATION_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  {
    name: "Calculation Start Date",
    value: SortDepreciationBy.CALCULATION_START_DATE,
  },
  {
    name: "Calculation End Date",
    value: SortDepreciationBy.CALCULATION_END_DATE,
  },
  { name: "Depreciation Value", value: SortDepreciationBy.DEPRECIATION_VALUE },
  {
    name: "Accumulated Depreciation Value",
    value: SortDepreciationBy.ACCUMULATED_DEPRECIATION_VALUE,
  },
  {
    name: "Depreciated Book Value",
    value: SortDepreciationBy.DEPRECIATED_BOOK_VALUE,
  },
  { name: "Created At", value: SortDepreciationBy.CREATED_AT },
  { name: "Updated At", value: SortDepreciationBy.UPDATED_AT },
];

export const QUERY_SORT_BY_SITE_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortSiteBy.NAME },
  { name: "Created At", value: SortSiteBy.CREATED_AT },
  { name: "Updated At", value: SortSiteBy.UPDATED_AT },
];

export const QUERY_SORT_BY_AUDITGROUP_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortAuditgroupBy.NAME },
  { name: "Created At", value: SortAuditgroupBy.CREATED_AT },
  { name: "Updated At", value: SortAuditgroupBy.UPDATED_AT },
];

export const QUERY_SORT_BY_AUDIT_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Created At", value: SortAuditBy.CREATED_AT },
  { name: "Updated At", value: SortAuditBy.UPDATED_AT },
];

export const QUERY_SORT_BY_SCAN_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Created At", value: SortScanBy.CREATED_AT },
];

export const QUERY_SORT_BY_MEMBERSHIP_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Last Active At", value: SortMembershipBy.LAST_ACTIVE_AT },
  { name: "Created At", value: SortMembershipBy.CREATED_AT },
  { name: "Updated At", value: SortMembershipBy.UPDATED_AT },
];

export const QUERY_SORT_BY_SUBSCRIPTION_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Created At", value: SortSubscriptionBy.CREATED_AT },
  { name: "Updated At", value: SortSubscriptionBy.UPDATED_AT },
];

export const QUERY_SORT_BY_SUBSCRIPTIONTIER_OPTIONS: SelectOptionType[] = [
  { name: "None", value: "" },
  { name: "Name", value: SortSubscriptiontierBy.NAME },
  { name: "Position", value: SortSubscriptiontierBy.POSITION },
  { name: "Created At", value: SortSubscriptiontierBy.CREATED_AT },
  { name: "Updated At", value: SortSubscriptiontierBy.UPDATED_AT },
];

// Combine and deduplicate sorting options
const combinedSortByOptions = [
  ...QUERY_SORT_BY_ASSET_OPTIONS,
  ...QUERY_SORT_BY_PARTNER_OPTIONS,
  ...QUERY_SORT_BY_ASSETMODEL_OPTIONS,
  ...QUERY_SORT_BY_KIT_OPTIONS,
  ...QUERY_SORT_BY_DEPRECIATIONSETTING_OPTIONS,
  ...QUERY_SORT_BY_CATEGORY_OPTIONS,
  ...QUERY_SORT_BY_TAG_OPTIONS,
  ...QUERY_SORT_BY_TASK_OPTIONS,
  ...QUERY_SORT_BY_CUSTOMFIELD_OPTIONS,
  ...QUERY_SORT_BY_ASSIGNEE_OPTIONS,
  ...QUERY_SORT_BY_LOCATION_OPTIONS,
  ...QUERY_SORT_BY_SITE_OPTIONS,
  ...QUERY_SORT_BY_AUDITGROUP_OPTIONS,
  ...QUERY_SORT_BY_AUDIT_OPTIONS,
  ...QUERY_SORT_BY_TRANSACTION_OPTIONS,
  ...QUERY_SORT_BY_DEPRECIATION_OPTIONS,
  ...QUERY_SORT_BY_MEMBERSHIP_OPTIONS,
  ...QUERY_SORT_BY_SUBSCRIPTIONTIER_OPTIONS,
];

// Create a Set to filter out duplicate options based on their value
const uniqueSortByOptions = Array.from(
  new Map(
    combinedSortByOptions.map((option) => [option.value, option]),
  ).values(),
);

type AllQueryOptions = {
  [K in QueryParamKey]: SelectOptionType[] | null;
};

export const ALL_QUERY_OPTIONS: AllQueryOptions = {
  [QueryParamKey.SORT_BY]: uniqueSortByOptions,
  [QueryParamKey.ORDER_BY]: QUERY_ORDER_BY_OPTIONS,
  [QueryParamKey.PAGE]: null,
  [QueryParamKey.LIMIT]: PAGE_LIMIT_OPTIONS,
  [QueryParamKey.SEARCH]: null,
  [QueryParamKey.NUMBER]: null,
  [QueryParamKey.SESSION_ID]: null,
  [QueryParamKey.ORIGIN]: null,
  [QueryParamKey.SUBDOMAIN]: null,
};
