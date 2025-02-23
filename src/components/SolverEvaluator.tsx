import React, { useState } from "react";
import { useSolverModule } from "@/hooks/useSolverModule";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-gray-100 shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Expression Evaluator</h2>
      
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Enter expression (e.g. x^2 + 1)"
      />
      
      <button
        onClick={handleEvaluate}
        className="mt-4 w-full px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
      >
        Evaluate
      </button>

      <AnimatePresence>
        {result !== null && (
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-green-600 font-semibold text-lg text-center"
          >
            ✅ Result: {result}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-red-500 text-center"
          >
            ❌ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SolverEvaluator;
