import { motion } from 'framer-motion';
import { ScanSearch } from 'lucide-react';

export default function Loader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 gap-5"
        >
            {/* Spinning ring */}
            <div className="relative w-20 h-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-cyan border-r-accent-blue"
                />
                <div className="absolute inset-2 rounded-full bg-navy-900/80 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ScanSearch className="w-7 h-7 text-accent-cyan" />
                    </motion.div>
                </div>
            </div>

            <div className="text-center">
                <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-accent-cyan font-semibold text-lg"
                >
                    Analyzing transaction with AI...
                </motion.p>
                <p className="text-navy-500 text-sm mt-1">This may take a moment</p>
            </div>
        </motion.div>
    );
}
