/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useSolverModule } from "@/hooks/useSolverModule";
import { AnimatePresence } from "framer-motion";


import SolverPanel from "./SolverPanel";
import SolverInputRow from "./SolverInputRow";
import SolverEvaluator from "./SolverEvaluator";
import SaveButton from "./ui/SaveButton";
import { AnimatedErrorMessage } from "./ui/AnimatedErrorMessage";

const SolverDashboard: React.FC = () => {
  const { solver, getException } = useSolverModule();

  const [variables, setVariables] = useState<{ name: string; value?: string }[]>([]);
  const [constants, setConstants] = useState<{ name: string; value?: string }[]>([]);
  const [functions, setFunctions] = useState<{ name: string; args: string[]; expression: string }[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (solver) {
      setVariables(
        Object.entries(solver.listVariables()).map(([name, value]) => ({
          name,
          value: value !== undefined ? value.toString() : "", // Convert number to string
        }))
      );

      setConstants(
        Object.entries(solver.listConstants()).map(([name, value]) => ({
          name,
          value: value !== undefined ? value.toString() : "", // Convert number to string
        }))
      );
    }
  }, [solver]);

  const handleSave = () => {
    if (!solver) return;
    try {
      variables.forEach((v) => v.value !== "" && solver.declareVariable(v.name, Number(v.value)));
      constants.forEach((c) => c.value !== "" && solver.declareConstant(c.name, Number(c.value)));
      functions.forEach((f) => solver.declareFunction(f.name, f.args, f.expression));
      setError("State saved successfully ✅");
    } catch (err) {
      setError("Error saving state ❌ " + getException(err));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <SolverEvaluator />

      <SolverPanel title="Variables" onAdd={() => setVariables([...variables, { name: "", value: "" }])}>
        {variables.map((variable, index) => (
          <SolverInputRow
            key={index}
            name={variable.name}
            value={variable.value}
            onChange={(key, val) => {
              const updated = [...variables];
              (updated[index] as any)[key] = val;
              setVariables(updated);
            }}
            onRemove={() => setVariables(variables.filter((_, i) => i !== index))}
          />
        ))}
      </SolverPanel>


      <SolverPanel title="Constants" onAdd={() => setConstants([...constants, { name: "", value: undefined }])}>
        {constants.map((constant, index) => (
          <SolverInputRow
            key={index}
            name={constant.name}
            value={constant.value}
            onChange={(key, val) => {
              const updated = [...constants];
              (updated[index] as any)[key] = val;
              setConstants(updated);
            }}
            onRemove={() => setConstants(constants.filter((_, i) => i !== index))}
          />
        ))}
      </SolverPanel>

      <SolverPanel title="Functions" onAdd={() => setFunctions([...functions, { name: "", args: ["x"], expression: "x" }])}>
        {functions.map((func, index) => (
          <SolverInputRow
            key={index}
            value={null}
            name={func.name}
            args={func.args.join(",")}
            expr={func.expression}
            onChange={(key, val) => {
              const updated = [...functions];
              (updated[index] as any)[key] = val;
              setFunctions(updated);
            }}
            onRemove={() => setFunctions(functions.filter((_, i) => i !== index))}
          />
        ))}
      </SolverPanel>

      <div className="col-span-1 md:col-span-2 flex justify-end">
        <SaveButton onClick={handleSave} />
      </div>

      {/* Animated Error Message */}
      <AnimatePresence>{error && <AnimatedErrorMessage message={error} />}</AnimatePresence>
    </div>
  );
};

export default SolverDashboard;
