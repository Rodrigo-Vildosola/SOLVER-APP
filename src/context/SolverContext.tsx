import { createContext } from "react";
import { SolverInstance } from "@/lib/solver";

// Extend the interface to include your custom module functions:
export interface SolverContextType {
  solver: SolverInstance | null;
  getExceptionMessage: CallableFunction;
  getException: CallableFunction;
}

export const SolverContext = createContext<SolverContextType>({
  solver: null,
  getExceptionMessage: () => "no-op",
  getException: () => "no-op"
});
