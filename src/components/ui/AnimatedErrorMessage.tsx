import { motion } from "framer-motion";

export const AnimatedErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="col-span-1 md:col-span-2 text-center text-red-500 font-semibold bg-red-100 border border-red-400 px-4 py-2 rounded-lg shadow-md"
    >
      ⚠️ {message}
    </motion.div>
  );
};
