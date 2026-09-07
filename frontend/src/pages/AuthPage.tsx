import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';

const AuthPage = () => {
    const navigate = useNavigate();
    const { loginState } = useAuth();
    
    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                // Login
                const { data } = await axios.post('/api/auth/login', { email, password });
                loginState(data, data.token);
                toast.success('Successfully logged in!');
                // Redirect based on role
                if (data.role === 'admin') navigate('/admin');
                else if (data.role === 'instructor') navigate('/instructor');
                else navigate('/student');
            } else {
                // Register
                await axios.post('/api/auth/register', { name, email, password });
                toast.success('Successfully registered! Please login.');
                
                // Switch to login tab and prepopulate email
                setIsLogin(true);
                setPassword('');
            }
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'An error occurred during authentication';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/auth/google', { 
                credential: credentialResponse.credential 
            });
            loginState(data, data.token);
            toast.success('Successfully authenticated with Google!');
            
            // Redirect based on role
            if (data.role === 'admin') navigate('/admin');
            else if (data.role === 'instructor') navigate('/instructor');
            else navigate('/student');
            
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Google Auth Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col pt-20">
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {/* Header Tabs */}
                    <div className="flex bg-slate-100 dark:bg-slate-800/50">
                        <button 
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-4 font-bold text-center transition-colors ${!isLogin ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t-4 border-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            Register
                        </button>
                        <button 
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-4 font-bold text-center transition-colors ${isLogin ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t-4 border-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            Login
                        </button>
                    </div>

                    {/* Form Area */}
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black mb-2">{isLogin ? 'Welcome Back!' : 'Start Your Journey'}</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                                {isLogin ? 'Enter your details to access your dashboard' : 'Join the academy to track progress and book classes'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            <AnimatePresence mode='wait'>
                                {!isLogin && (
                                    <motion.div
                                        key="name"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input 
                                                type="text" 
                                                className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" 
                                                placeholder="Full Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required={!isLogin}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type="email" 
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" 
                                    placeholder="Email Address"
                                    autoComplete="username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type="password" 
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" 
                                    placeholder="Password"
                                    autoComplete={isLogin ? "current-password" : "new-password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {isLogin && (
                                <div className="flex justify-end">
                                    <button type="button" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                                {!loading && <ArrowRight className="h-5 w-5" />}
                            </button>
                        </form>

                        {/* Google Sign In */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-3 bg-white dark:bg-slate-900 text-slate-500 font-medium">Or continue with</span>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-center w-full">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => toast.error('Google Sign In was unsuccessful')}
                                    useOneTap
                                    shape="rectangular"
                                    size="large"
                                    theme="outline"
                                    text={isLogin ? "signin_with" : "signup_with"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
