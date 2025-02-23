import React, { useState } from "react";
import { useSolverModule } from "@/hooks/useSolverModule";

const FunctionsPanel: React.FC = () => {
  const { solver } = useSolverModule();
  const [funcName, setFuncName] = useState("f");
  const [args, setArgs] = useState("x,y");
  const [expression, setExpression] = useState("x + y");
  const [message, setMessage] = useState("");

  const handleDeclareFunction = () => {
    if (!solver) return;
    try {
      const argArray = args.split(",").map((s) => s.trim());
      solver.declareFunction(funcName, argArray, expression);
      setMessage(`Function "${funcName}" declared as ${expression}`);
    } catch (err) {
      setMessage(`Error: ${err}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Manage Functions</h2>

      <div>
        <label className="block font-medium">Name:</label>
        <input
          value={funcName}
          onChange={(e) => setFuncName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Arguments (comma separated):</label>
        <input
          value={args}
          onChange={(e) => setArgs(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Expression:</label>
        <input
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={handleDeclareFunction}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Declare Function
      </button>

      {message && <p className="mt-2 text-blue-600">{message}</p>}
    </div>
  );
};

export default FunctionsPanel;
