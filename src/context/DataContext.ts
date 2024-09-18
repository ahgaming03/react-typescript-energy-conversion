import { IGHG, ITemperature } from "@/utils/type";
import { createContext, useContext } from "react";

interface IData {
  GHG: IGHG[];
  temperature: ITemperature[];
}

export const DataContext = createContext<IData | undefined>(undefined);

export function useDataContext() {
  const data = useContext(DataContext);
  if (data === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return data;
}
