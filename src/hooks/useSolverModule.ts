import { useContext } from "react";
import { SolverContext, SolverContextType } from "@/context/SolverContext";

export function useSolverModule() {
  return useContext<SolverContextType>(SolverContext);
}
