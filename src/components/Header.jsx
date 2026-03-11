import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center py-10"
        >
            <div className="flex items-center justify-center gap-3 mb-3">
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ShieldCheck className="w-10 h-10 text-accent-cyan" strokeWidth={1.5} />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold gradient-text tracking-tight">
                    Fraud Detection Dashboard
                </h1>
            </div>
            <p className="text-navy-400 text-base md:text-lg font-medium tracking-wide">
                AI-Powered Bank Transaction Risk Analyzer
            </p>
            <div className="mt-4 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-cyan to-transparent rounded-full" />
        </motion.header>
    );
}
