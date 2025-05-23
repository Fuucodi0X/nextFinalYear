import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent animate-spin" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-25" />
        </div>

        {/* Loading Text */}
        <p className="text-gray-600 text-lg font-medium">Loading...</p>
      </motion.div>
    </div>
  );
}
