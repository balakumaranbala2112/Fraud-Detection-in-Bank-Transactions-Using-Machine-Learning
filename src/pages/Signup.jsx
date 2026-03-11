import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ShieldCheck, Mail, Lock, User, UserPlus, Eye, EyeOff } from 'lucide-react';

export default function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        // Dummy signup — simulate then redirect to login
        setTimeout(() => {
            toast.success('Account created successfully! Please sign in.');
            navigate('/login');
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-green mb-4"
                    >
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </motion.div>
                    <h1 className="text-2xl font-bold gradient-text">Create Account</h1>
                    <p className="text-navy-400 text-sm mt-1">Join the Fraud Detection Dashboard</p>
                </div>

                {/* Form Card */}
                <div className="glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="field-label">Full Name</label>
                            <div className="relative">
                                <User className="input-icon" />
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="input-field input-with-icon"
                                    autoComplete="name"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="field-label">Email Address</label>
                            <div className="relative">
                                <Mail className="input-icon" />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="you@example.com"
                                    className="input-field input-with-icon"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="field-label">Password</label>
                            <div className="relative">
                                <Lock className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="Min. 6 characters"
                                    className="input-field input-with-icon pr-12"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="field-label">Confirm Password</label>
                            <div className="relative">
                                <Lock className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    placeholder="Re-enter password"
                                    className="input-field input-with-icon"
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-accent-cyan to-accent-green
                         hover:from-cyan-500 hover:to-emerald-400
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300 glow-green flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4" />
                                    Create Account
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-navy-700/50" />
                        <span className="text-navy-500 text-xs uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-navy-700/50" />
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-navy-400 text-sm">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-accent-cyan hover:text-accent-blue font-semibold transition-colors"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
