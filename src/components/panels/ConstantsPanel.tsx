import React, { useState } from "react";
import { useSolverModule } from "@/hooks/useSolverModule";

const ConstantsPanel: React.FC = () => {
  const { solver } = useSolverModule();
  const [constName, setConstName] = useState("c");
  const [constValue, setConstValue] = useState(2.71828);
  const [message, setMessage] = useState("");

  const handleDeclareConstant = () => {
    if (!solver) return;
    try {
      solver.declareConstant(constName, constValue);
      setMessage(`Constant "${constName}" declared as ${constValue}`);
    } catch (err) {
      setMessage(`Error: ${err}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Manage Constants</h2>

      <div>
        <label className="block font-medium">Name:</label>
        <input
          value={constName}
          onChange={(e) => setConstName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Value:</label>
        <input
          type="number"
          value={constValue}
          onChange={(e) => setConstValue(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={handleDeclareConstant}
        className="px-4 py-2 bg-pink-600 text-white rounded"
      >
        Declare Constant
      </button>

      {message && <p className="mt-2 text-blue-600">{message}</p>}
    </div>
  );
};

export default ConstantsPanel;
