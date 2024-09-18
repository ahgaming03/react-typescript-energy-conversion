import { IFactoryInfo } from "@/utils/type";
import { createContext, useContext } from "react";

export const FactoryInfoContext = createContext<IFactoryInfo | undefined>(
  undefined,
);

export function useFactoryInfoContext() {
  const info = useContext(FactoryInfoContext);
  if (info === undefined) {
    throw new Error(
      "useFactoryInfoContext must be used within a FactoryInfoContext.Provider",
    );
  }
  return info;
}
