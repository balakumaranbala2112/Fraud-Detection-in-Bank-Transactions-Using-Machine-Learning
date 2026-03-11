import { motion } from 'framer-motion';
import {
    DollarSign,
    ArrowRightLeft,
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    CreditCard,
} from 'lucide-react';

const transactionTypes = ['Transfer', 'Cash Out', 'Payment', 'Debit'];

export default function TransactionForm({ formData, onChange, onSubmit, isLoading }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    const fields = [
        { name: 'amount', label: 'Transaction Amount', icon: DollarSign, type: 'number', placeholder: 'e.g. 50000' },
        { name: 'senderBalanceBefore', label: 'Sender Balance Before', icon: Wallet, type: 'number', placeholder: 'e.g. 100000' },
        { name: 'senderBalanceAfter', label: 'Sender Balance After', icon: ArrowUpRight, type: 'number', placeholder: 'e.g. 50000' },
        { name: 'receiverBalanceBefore', label: 'Receiver Balance Before', icon: ArrowDownLeft, type: 'number', placeholder: 'e.g. 20000' },
        { name: 'receiverBalanceAfter', label: 'Receiver Balance After', icon: CreditCard, type: 'number', placeholder: 'e.g. 70000' },
    ];

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 md:p-8 max-w-2xl mx-auto"
        >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-accent-cyan" />
                Transaction Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Transaction Type Dropdown */}
                <div className="md:col-span-2">
                    <label className="field-label">Transaction Type</label>
                    <div className="relative">
                        <ArrowRightLeft className="input-icon" />
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="input-field input-with-icon appearance-none cursor-pointer"
                        >
                            {transactionTypes.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Numeric Fields */}
                {fields.map(({ name, label, icon: Icon, type, placeholder }) => (
                    <div key={name}>
                        <label className="field-label">{label}</label>
                        <div className="relative">
                            <Icon className="input-icon" />
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className="input-field input-with-icon"
                                required
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full py-4 rounded-xl font-semibold text-white text-lg
                   bg-gradient-to-r from-accent-blue to-accent-cyan
                   hover:from-accent-blue hover:to-blue-400
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 glow-blue cursor-pointer"
            >
                {isLoading ? 'Analyzing...' : '🔍  Analyze Transaction'}
            </motion.button>
        </motion.form>
    );
}
