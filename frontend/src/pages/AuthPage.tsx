import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, KeyRound, ArrowLeft } from 'lucide-react';
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
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [resetStep, setResetStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (resetStep === 1) {
                await axios.post('/api/auth/forgot-password', { email });
                toast.success('OTP sent! Please check your email.');
                setResetStep(2);
                setPassword('');
            } else {
                await axios.post('/api/auth/reset-password', { email, otp, newPassword: password });
                toast.success('Password reset successful! Logging you in...');
                
                // Auto-login
                const { data } = await axios.post('/api/auth/login', { email, password });
                loginState(data, data.token);
                
                if (data.role === 'admin') navigate('/admin');
                else if (data.role === 'instructor') navigate('/instructor');
                else navigate('/student');
            }
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Failed to process request';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

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
        <div className="min-h-screen flex flex-col pt-20 relative bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Attractive Full Screen Logo Background */}
            <div 
                className="absolute inset-0 z-0 transition-opacity duration-1000"
                style={{
                    backgroundImage: 'url(/logo.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(10px) brightness(0.8)',
                    opacity: 0.3,
                    transform: 'scale(1.1)' // Prevent blurred edges from leaking
                }}
            />
            
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-amber-500/10 dark:from-indigo-900/40 dark:to-slate-900/80 mix-blend-multiply"></div>

            <div className="flex-1 flex items-center justify-center p-4 relative z-10">
                <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50 overflow-hidden">
                    {/* Header Tabs */}
                    {!isForgotPassword && (
                        <div className="flex bg-slate-100 dark:bg-slate-800/50">
                            <button 
                                type="button"
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-4 font-bold text-center transition-colors ${!isLogin ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t-4 border-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                            >
                                Register
                            </button>
                            <button 
                                type="button"
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-4 font-bold text-center transition-colors ${isLogin ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t-4 border-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                            >
                                Login
                            </button>
                        </div>
                    )}

                    {/* Form Area */}
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-black mb-2">
                                {isForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome Back!' : 'Start Your Journey')}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                                {isForgotPassword 
                                    ? (resetStep === 1 ? 'Enter your email to receive an OTP' : 'Enter the OTP and your new password')
                                    : (isLogin ? 'Enter your details to access your dashboard' : 'Join the academy to track progress and book classes')}
                            </p>
                        </div>

                        {isForgotPassword ? (
                            <form onSubmit={handleForgotPassword} className="space-y-5">
                                {error && (
                                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm font-medium">
                                        {error}
                                    </div>
                                )}

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
                                        disabled={resetStep === 2}
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        spellCheck="false"
                                        required
                                    />
                                </div>

                                {resetStep === 2 && (
                                    <>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <KeyRound className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input 
                                                type="text" 
                                                className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium tracking-[0.5em]" 
                                                placeholder="6-Digit OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                maxLength={6}
                                                required
                                            />
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input 
                                                type={showPassword ? "text" : "password"}
                                                className="block w-full pl-10 pr-10 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" 
                                                placeholder="New Password"
                                                autoComplete="new-password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoCapitalize="none"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                required
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none flex items-center justify-center p-1">
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Processing...' : (resetStep === 1 ? 'Send OTP' : 'Reset & Login')}
                                    {!loading && <ArrowRight className="h-5 w-5" />}
                                </button>
                                
                                <div className="flex justify-center mt-4">
                                    <button 
                                        type="button" 
                                        onClick={() => { setIsForgotPassword(false); setResetStep(1); setError(''); }} 
                                        className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back to Login
                                    </button>
                                </div>
                            </form>
                        ) : (
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
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    className="block w-full pl-10 pr-10 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" 
                                    placeholder="Password"
                                    autoComplete={isLogin ? "current-password" : "new-password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    spellCheck="false"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none flex items-center justify-center p-1"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {isLogin && (
                                <div className="flex justify-end">
                                    <button 
                                        type="button" 
                                        onClick={() => { setIsForgotPassword(true); setError(''); setPassword(''); }}
                                        className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                                    >
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
                        )}

                        {/* Google Sign In */}
                        {!isForgotPassword && (
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
