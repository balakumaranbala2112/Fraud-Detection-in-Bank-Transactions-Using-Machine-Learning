import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogOut } from 'lucide-react';
import Header from '../components/Header';
import TransactionForm from '../components/TransactionForm';
import FraudMeter from '../components/FraudMeter';
import ResultCard from '../components/ResultCard';
import RiskBar from '../components/RiskBar';
import ChartSection from '../components/ChartSection';
import Loader from '../components/Loader';

const initialForm = {
    amount: '',
    type: 'Transfer',
    senderBalanceBefore: '',
    senderBalanceAfter: '',
    receiverBalanceBefore: '',
    receiverBalanceAfter: '',
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialForm);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_email');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setResult(null);

        const payload = {
            amount: parseFloat(formData.amount),
            type: formData.type,
            senderBalanceBefore: parseFloat(formData.senderBalanceBefore),
            senderBalanceAfter: parseFloat(formData.senderBalanceAfter),
            receiverBalanceBefore: parseFloat(formData.receiverBalanceBefore),
            receiverBalanceAfter: parseFloat(formData.receiverBalanceAfter),
        };

        try {
            const res = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error(`Server error: ${res.status}`);

            const data = await res.json();
            const probability = data.fraud_probability ?? data.probability ?? 0;
            setResult({ probability });

            if (probability > 70) {
                toast.error(`⚠️ High fraud risk detected: ${probability.toFixed(1)}%`);
            } else if (probability > 40) {
                toast('⚡ Medium risk detected', { icon: '⚠️' });
            } else {
                toast.success(`✅ Transaction appears safe: ${probability.toFixed(1)}%`);
            }
        } catch (err) {
            toast.error(err.message || 'Failed to connect to the backend');
            // Fallback demo result so UI is still visible
            setResult({ probability: 73.5 });
            toast('Showing demo result', { icon: 'ℹ️' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-4 py-6 md:px-8 max-w-5xl mx-auto">
            {/* Logout button */}
            <div className="flex justify-end mb-2">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                     text-navy-300 hover:text-white hover:bg-navy-800/60
                     border border-navy-600/50 hover:border-navy-500/60
                     transition-all duration-300 cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>

            <Header />

            <main className="space-y-8">
                <TransactionForm
                    formData={formData}
                    onChange={setFormData}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />

                <AnimatePresence>
                    {isLoading && <Loader />}
                </AnimatePresence>

                {result && !isLoading && (
                    <div className="space-y-8">
                        <div className="flex justify-center">
                            <div className="w-full max-w-sm">
                                <FraudMeter probability={result.probability} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ResultCard probability={result.probability} />
                            <RiskBar probability={result.probability} />
                        </div>

                        <div className="max-w-md mx-auto">
                            <ChartSection probability={result.probability} />
                        </div>
                    </div>
                )}
            </main>

            <footer className="text-center py-8 mt-12 border-t border-navy-800/50">
                <p className="text-navy-600 text-sm">
                    Fraud Detection Dashboard &middot; AI-Powered Risk Analysis
                </p>
            </footer>
        </div>
    );
}
