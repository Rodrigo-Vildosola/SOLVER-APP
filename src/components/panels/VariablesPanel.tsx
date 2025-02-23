import React, { useState } from "react";
import { useSolverModule } from "@/hooks/useSolverModule";

const VariablesPanel: React.FC = () => {
  const { solver } = useSolverModule();
  const [variableName, setVariableName] = useState("x");
  const [variableValue, setVariableValue] = useState(3);
  const [message, setMessage] = useState("");

  const handleDeclare = () => {
    if (!solver) return;
    try {
      solver.declareVariable(variableName, variableValue);
      setMessage(`Variable "${variableName}" set to ${variableValue}.`);
    } catch (err) {
      setMessage(`Error: ${err}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Manage Variables</h2>

      <div>
        <label className="block font-medium">Name:</label>
        <input
          type="text"
          value={variableName}
          onChange={(e) => setVariableName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Value:</label>
        <input
          type="number"
          value={variableValue}
          onChange={(e) => setVariableValue(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={handleDeclare}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Declare Variable
      </button>

      {message && <p className="mt-2 text-blue-600">{message}</p>}
    </div>
  );
};

export default VariablesPanel;
