import { getTsid } from 'tsid-ts'

export const generateID = ():string => {
  return getTsid().toString().toLowerCase();
}