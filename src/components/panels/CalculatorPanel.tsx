import React, { useState } from "react";
import { useSolverModule } from "@/hooks/useSolverModule";

const CalculatorPanel: React.FC = () => {
  const { solver, getException } = useSolverModule();
  const [expression, setExpression] = useState("x^2 + 1");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleEvaluate = () => {
    if (!solver) {
      setError("Solver not ready");
      return;
    }
    try {
      const res = solver.evaluate(expression);
      setResult(res);
      setError("");
    } catch (err) {
      setError("Error evaluating expression " + getException(err));
      setResult(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Calculator</h2>
      <div>
        <label className="block font-medium mb-1">Expression:</label>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleEvaluate}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Evaluate
      </button>

      {result !== null && (
        <div className="mt-2">
          <strong>Result:</strong> {result}
        </div>
      )}
      {error && (
        <div className="mt-2 text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default CalculatorPanel;
