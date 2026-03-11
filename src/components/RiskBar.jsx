import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';

function getBarColor(value) {
    if (value <= 40) return 'from-accent-green to-emerald-400';
    if (value <= 70) return 'from-accent-yellow to-amber-400';
    return 'from-accent-red to-rose-400';
}

function getBarGlow(value) {
    if (value <= 40) return 'shadow-accent-green/30';
    if (value <= 70) return 'shadow-accent-yellow/30';
    return 'shadow-accent-red/30';
}

export default function RiskBar({ probability }) {
    const gradient = getBarColor(probability);
    const glow = getBarGlow(probability);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6"
        >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-accent-cyan" />
                Fraud Risk Level
            </h3>

            <div className="flex items-center justify-between text-sm text-navy-400 mb-2">
                <span>Low</span>
                <span className="font-semibold text-white">{probability.toFixed(1)}%</span>
                <span>High</span>
            </div>

            <div className="w-full h-4 bg-navy-900/80 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${probability}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-lg ${glow}`}
                />
            </div>

            <div className="flex justify-between text-xs text-navy-500 mt-2">
                <span>0%</span>
                <span>40%</span>
                <span>70%</span>
                <span>100%</span>
            </div>
        </motion.div>
    );
}
