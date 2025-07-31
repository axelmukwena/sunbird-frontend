import {
  AttendeeBaseCreate,
  AttendeeCheckinInfoCreate,
  AttendeeCreateGuestClient,
  AttendeeUpdateGuestClient,
} from "@/api/services/weaver/attendees/types";

import { AttendeeFormSchema } from "./schema";

export interface LoadAttendeeCreateData {
  values: AttendeeFormSchema;
}

export interface LoadAttendeeUpdateData {
  values: AttendeeFormSchema;
}

export interface LoadAttendeeRegisterData {
  values: AttendeeFormSchema;
}

/**
 * Get the data to create an attendee (full guest check-in)
 * @param {LoadAttendeeCreateData} data - The form data to create an attendee
 * @returns {AttendeeCreateGuestClient} - The data formatted for attendee creation API
 */
export const getAttendeeCreateData = ({
  values,
}: LoadAttendeeCreateData): AttendeeCreateGuestClient => {
  const data: AttendeeCreateGuestClient = {
    // Basic attendee information
    email: values.email,
    first_name: values.first_name,
    last_name: values.last_name,
    phone_number: values.phone_number,
    organisation_name: values.organisation_name,
    occupation: values.occupation,
    custom_field_responses: values.custom_field_responses,
    meeting_id: values.meeting_id,
    user_id: values.user_id || null,
    checkin: values.checkin as AttendeeCheckinInfoCreate,
    feedback: values.feedback || null,
  };

  return data;
};

/**
 * Get the data to update an attendee
 * @param {LoadAttendeeUpdateData} data - The form data to update an attendee
 * @returns {AttendeeUpdateGuestClient} - The data formatted for attendee update API
 */
export const getAttendeeUpdateData = ({
  values,
}: LoadAttendeeUpdateData): AttendeeUpdateGuestClient => {
  const data: AttendeeUpdateGuestClient = {
    email: values.email,
    first_name: values.first_name,
    last_name: values.last_name,
    phone_number: values.phone_number,
    organisation_name: values.organisation_name,
    occupation: values.occupation,
    custom_field_responses: values.custom_field_responses,
  };

  return data;
};

/**
 * Get the data to register an attendee (basic registration)
 * @param {LoadAttendeeRegisterData} data - The form data to register an attendee
 * @returns {AttendeeBaseCreate} - The data formatted for attendee registration API
 */
export const getAttendeeRegisterData = ({
  values,
}: LoadAttendeeRegisterData): AttendeeBaseCreate => {
  const data: AttendeeBaseCreate = {
    email: values.email,
    first_name: values.first_name,
    last_name: values.last_name,
    phone_number: values.phone_number,
    organisation_name: values.organisation_name,
    occupation: values.occupation,
    custom_field_responses: values.custom_field_responses,
    meeting_id: values.meeting_id,
    user_id: values.user_id || null,
  };

  return data;
};
