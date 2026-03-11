import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

function getColor(value) {
    if (value <= 40) return { color: '#10b981', label: 'Safe', glow: 'glow-green' };
    if (value <= 70) return { color: '#f59e0b', label: 'Medium Risk', glow: 'glow-yellow' };
    return { color: '#ef4444', label: 'High Risk', glow: 'glow-red' };
}

export default function FraudMeter({ probability }) {
    const [displayVal, setDisplayVal] = useState(0);
    const { color, label, glow } = getColor(probability);

    const springValue = useSpring(0, { stiffness: 40, damping: 15 });
    const rounded = useTransform(springValue, (v) => Math.round(v));

    useEffect(() => {
        springValue.set(probability);
        const unsub = rounded.on('change', (v) => setDisplayVal(v));
        return unsub;
    }, [probability, springValue, rounded]);

    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (probability / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`glass-card p-8 flex flex-col items-center gap-4 ${glow}`}
        >
            <h3 className="text-lg font-semibold text-white">Fraud Probability</h3>

            <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                    {/* Background circle */}
                    <circle
                        cx="80" cy="80" r={radius}
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="10"
                    />
                    {/* Animated arc */}
                    <motion.circle
                        cx="80" cy="80" r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">{displayVal}%</span>
                    <span className="text-sm mt-1" style={{ color }}>{label}</span>
                </div>
            </div>
        </motion.div>
    );
}
