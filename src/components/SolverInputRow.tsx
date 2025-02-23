/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaTrash } from "react-icons/fa";

interface SolverInputRowProps {
  name: string;
  value?: number;
  args?: string;
  expr?: string;
  onChange: (key: string, value: any) => void;
  onRemove: () => void;
}

const SolverInputRow: React.FC<SolverInputRowProps> = ({ name, value, args, expr, onChange, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 mt-3 p-3 rounded-lg border border-gray-300 bg-gradient-to-r from-white to-gray-50 transition-all hover:shadow-lg">
      {/* Name Input */}
      <input
        type="text"
        value={name}
        onChange={(e) => onChange("name", e.target.value)}
        className="p-2 rounded-md w-1/3 bg-transparent border-b-2 border-blue-400 focus:outline-none focus:border-blue-600 transition-all duration-200"
        placeholder="Name"
      />

      {/* Value Input (Only for Variables & Constants) */}
      {value !== undefined && (
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const newValue = e.target.value.replace(/[^0-9.-]/g, ""); // Only allow numbers, decimals, and negatives
            onChange("value", newValue);
          }}
          onBlur={(e) => {
            // Ensure the value is a valid number when focus is lost
            if (isNaN(Number(e.target.value))) {
              onChange("value", "0"); // Default to 0 if invalid
            }
          }}
          className="p-2 rounded-md w-1/3 bg-transparent border-b-2 border-green-400 focus:outline-none focus:border-green-600 transition-all duration-200"
          placeholder="Value"
        />
      )}

      {/* Function Arguments & Expression Inputs */}
      {args !== undefined && expr !== undefined && (
        <>
          <input
            type="text"
            value={args}
            onChange={(e) => onChange("args", e.target.value)}
            className="p-2 rounded-md w-1/4 bg-transparent border-b-2 border-purple-400 focus:outline-none focus:border-purple-600 transition-all duration-200"
            placeholder="Args (x,y)"
          />
          <input
            type="text"
            value={expr}
            onChange={(e) => onChange("expr", e.target.value)}
            className="p-2 rounded-md w-1/4 bg-transparent border-b-2 border-yellow-400 focus:outline-none focus:border-yellow-600 transition-all duration-200"
            placeholder="Expression"
          />
        </>
      )}

      {/* Delete Button */}
      <button 
        onClick={onRemove} 
        className="p-2 rounded cursor-pointer bg-red-500 hover:bg-red-600 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default SolverInputRow;
