import { createContext, useContext } from "react";

import { DataGridDirection } from "./types";

export const DataGridDirectionContext = createContext<DataGridDirection>("ltr");

export function useDataGridDirection(): DataGridDirection {
  return useContext(DataGridDirectionContext);
}
