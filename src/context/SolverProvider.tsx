import React, { useEffect, useState, useRef } from "react";
import { SolverModule, SolverInstance, createSolverModule } from "@/lib/solver";
import { SolverContext, SolverContextType } from "@/context/SolverContext";

export const SolverProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [solver, setSolver] = useState<SolverInstance | null>(null);
  const getExceptionMessageRef = useRef<CallableFunction>(() => "no-op");
  const getExceptionRef = useRef<CallableFunction>(() => "no-op");
  
  const solverRef = useRef<SolverInstance | null>(null); // 🔹 Store instance in ref (prevents recreation)

  useEffect(() => {
    async function initSolver() {
      if (solverRef.current) return; // 🔹 If solver exists, don't create a new one

      try {
        const mod: SolverModule = await createSolverModule();

        getExceptionMessageRef.current = mod.getExceptionMessage;
        getExceptionRef.current = mod.getException;

        const solverInstance = new mod.Solver(100);
        solverRef.current = solverInstance; // 🔹 Store the instance
        setSolver(solverInstance);
      } catch (error) {
        console.error("Failed to initialize solver:", error);
      }
    }

    initSolver();

    return () => {
      if (solverRef.current) {
        solverRef.current.delete();
        solverRef.current = null; // 🔹 Ensure cleanup
        console.log("Solver instance deleted");
      }
    };
  }, []);

  const contextValue: SolverContextType = {
    solver,
    getExceptionMessage: getExceptionMessageRef.current,
    getException: getExceptionRef.current
  };

  return (
    <SolverContext.Provider value={contextValue}>
      {children}
    </SolverContext.Provider>
  );
};
