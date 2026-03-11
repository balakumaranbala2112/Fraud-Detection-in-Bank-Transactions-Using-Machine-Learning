import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Activity } from 'lucide-react';

function getRisk(probability) {
    if (probability <= 40) return { level: 'Low', status: 'Safe', color: 'text-accent-green', bg: 'bg-accent-green/15', border: 'border-accent-green/30', Icon: ShieldCheck };
    if (probability <= 70) return { level: 'Medium', status: 'Suspicious', color: 'text-accent-yellow', bg: 'bg-accent-yellow/15', border: 'border-accent-yellow/30', Icon: ShieldAlert };
    return { level: 'High', status: 'Suspicious', color: 'text-accent-red', bg: 'bg-accent-red/15', border: 'border-accent-red/30', Icon: ShieldAlert };
}

export default function ResultCard({ probability }) {
    const { level, status, color, bg, border, Icon } = getRisk(probability);

    const rows = [
        { label: 'Fraud Probability', value: `${probability.toFixed(1)}%` },
        { label: 'Risk Level', value: level },
        {
            label: 'Transaction Status',
            value: (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${bg} ${color} border ${border}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {status}
                </span>
            ),
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6"
        >
            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent-cyan" />
                Prediction Result
            </h3>

            <div className="space-y-4">
                {rows.map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-navy-700/40 last:border-0">
                        <span className="text-navy-400 text-sm">{label}</span>
                        <span className={`font-semibold ${typeof value === 'string' ? color : ''}`}>{value}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
