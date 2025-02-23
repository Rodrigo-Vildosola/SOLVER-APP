import React, { useState } from "react";
import { useSolverModule } from "@/hooks/useSolverModule";

const SolverEvaluator: React.FC = () => {
  const { solver, getException } = useSolverModule();
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

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
      setError("Error evaluating expression ❌ " + getException(err));
      setResult(null);
    }
  };

  return (
    <div className="p-5 border rounded-lg bg-gradient-to-br from-white to-gray-100 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Expression Evaluator</h2>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter expression (e.g. x^2 + 1)"
      />
      <button onClick={handleEvaluate} className="mt-3 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Evaluate
      </button>

      {result !== null && <p className="mt-2 text-green-600 font-semibold">Result: {result}</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default SolverEvaluator;
