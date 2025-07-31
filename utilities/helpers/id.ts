import { getTsid } from "tsid-ts";
import { v4 as uuidv4 } from "uuid";

export const generateID = (): string => {
  return getTsid().toString().toLowerCase();
};

export const generateUUID = (): string => {
  return uuidv4().replace(/-/g, "");
};
