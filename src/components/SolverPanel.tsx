import React, { useState } from "react";
import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";

interface SolverPanelProps {
  title: string;
  onAdd: () => void;
  children: React.ReactNode;
}

const SolverPanel: React.FC<SolverPanelProps> = ({ title, onAdd, children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-5 border rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 shadow-md"
    >
      {/* Panel Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        <div className="flex gap-2">
          <button onClick={onAdd} className="text-green-600 hover:text-green-800">
            <FaPlus />
          </button>
          <button onClick={() => setExpanded(!expanded)} className="text-gray-700 hover:text-gray-900">
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default SolverPanel;
