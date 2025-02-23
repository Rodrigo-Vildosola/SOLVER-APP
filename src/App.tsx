import React, { useState } from "react";

import { SolverProvider } from "@/context/SolverProvider";
// import { useSolverModule } from "@/hooks/useSolverModule";

import Layout from "@/components/layout/Layout";
import CalculatorPanel from "@/components/panels/CalculatorPanel";
import VariablesPanel from "@/components/panels/VariablesPanel";
import FunctionsPanel from "@/components/panels/FunctionsPanel";
import ConstantsPanel from "@/components/panels/ConstantsPanel";
import SolverDashboard from "./components/SolverDashboard";

const SolverApp: React.FC = () => {
  // const solver = useSolverModule();
  const [activeTab, setActiveTab] = useState<"calc" | "vars" | "funcs" | "consts">("calc");

  // const handleEvaluate = () => {
  //   if (!solver) return;
  //   try {
  //     solver.declareVariable("x", 3);
  //     const result = solver.evaluate("x^2 + 1");
  //     console.log("Evaluation result:", result);
  //   } catch (error) {
  //     console.error("Evaluation error:", error);
  //   }
  // };

  return (
    <Layout>
      {/* Simplified manual tab switcher */}
      <div className="mb-4 space-x-2">
        <button onClick={() => setActiveTab("calc")} className="px-2 py-1 bg-gray-200 rounded">
          Calculator
        </button>
        <button onClick={() => setActiveTab("vars")} className="px-2 py-1 bg-gray-200 rounded">
          Variables
        </button>
        <button onClick={() => setActiveTab("funcs")} className="px-2 py-1 bg-gray-200 rounded">
          Functions
        </button>
        <button onClick={() => setActiveTab("consts")} className="px-2 py-1 bg-gray-200 rounded">
          Constants
        </button>
      </div>

      {activeTab === "calc" && <CalculatorPanel />}
      {activeTab === "vars" && <VariablesPanel />}
      {activeTab === "funcs" && <FunctionsPanel />}
      {activeTab === "consts" && <ConstantsPanel />}
      <SolverDashboard />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <SolverProvider>
      <SolverApp />
    </SolverProvider>
  );
};

export default App;
