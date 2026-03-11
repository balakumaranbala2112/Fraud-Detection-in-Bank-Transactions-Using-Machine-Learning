import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { BarChart3 } from 'lucide-react';

function getChartColor(value) {
    if (value <= 40) return '#10b981';
    if (value <= 70) return '#f59e0b';
    return '#ef4444';
}

export default function ChartSection({ probability }) {
    const fill = getChartColor(probability);

    const data = [
        { name: 'Fraud', value: probability, fill },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-6"
        >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent-cyan" />
                Risk Visualization
            </h3>

            <div className="w-full h-52">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="90%"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        barSize={14}
                    >
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar
                            dataKey="value"
                            cornerRadius={8}
                            background={{ fill: '#1e293b' }}
                            angleAxisId={0}
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>

            <div className="text-center -mt-6">
                <span className="text-2xl font-bold text-white">{probability.toFixed(1)}%</span>
                <p className="text-navy-400 text-sm mt-1">Fraud Risk Score</p>
            </div>
        </motion.div>
    );
}
