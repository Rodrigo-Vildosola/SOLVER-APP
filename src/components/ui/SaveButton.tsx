import { FaSave, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const SaveButton: React.FC<{ onClick: () => void; success?: boolean }> = ({ onClick, success }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 flex items-center gap-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all shadow-lg"
    >
      {success ? (
        <>
          <FaCheckCircle className="animate-pulse text-green-300" />
          Saved!
        </>
      ) : (
        <>
          <FaSave />
          Save State
        </>
      )}
    </motion.button>
  );
};

export default SaveButton;
