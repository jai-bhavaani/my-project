import React, { useState } from 'react';
import { BookOpen, KeyRound, Mail, ArrowRight, User } from 'lucide-react';
import './LoginForm.css';
import { supabase } from '../lib/supabase';

interface LoginFormProps {
    onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            if (isSignUp) {
                // 1. Sign up the user in Supabase Auth
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) throw error;

                // 2. Insert into profiles table
                if (data.user) {
                    const { error: profileError } = await supabase.from('profiles').insert([
                        { id: data.user.id, full_name: fullName, role: 'student' }
                    ]);

                    if (profileError) {
                        console.error('Failed to create profile:', profileError);
                        // Optionally handle profile creation failure
                    }
                }

                // If email confirmation is off, this logs them in.
                onLoginSuccess();
            } else {
                // Login existing user
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) throw error;
                onLoginSuccess();
            }
        } catch (err: any) {
            setErrorMsg(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form">
            <div className="login-form__header">
                <div className="login-form__logo">
                    <BookOpen className="login-form__logo-icon" size={32} />
                    <span>StudyHub</span>
                </div>
                <h1 className="login-form__title">{isSignUp ? 'Create an Account' : 'Student Login'}</h1>
                <p className="login-form__subtitle">
                    {isSignUp ? 'Join the community to access and share resources' : 'Enter your credentials to access the resource hub'}
                </p>
            </div>

            {errorMsg && (
                <div style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '14px' }}>
                    {errorMsg}
                </div>
            )}

            <form className="login-form__form" onSubmit={handleSubmit}>
                {isSignUp && (
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={20} />
                            <input
                                type="text"
                                id="fullName"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required={isSignUp}
                            />
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-wrapper">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            id="email"
                            placeholder="name@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-group__header">
                        <label htmlFor="password">Password</label>
                        {!isSignUp && <a href="#" className="forgot-password">Forgot password?</a>}
                    </div>
                    <div className="input-wrapper">
                        <KeyRound className="input-icon" size={20} />
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn--primary" disabled={loading}>
                    <span>{loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}</span>
                    {!loading && <ArrowRight size={20} className="btn-icon" />}
                </button>
            </form>

            <div className="login-form__divider">
                <span>OR</span>
            </div>

            <button
                type="button"
                className="btn btn--outline"
                onClick={() => setIsSignUp(!isSignUp)}
            >
                {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </button>

            <div className="login-form__footer">
                <p className="version-text">Powered by StudyHub Engine v4.0</p>
            </div>
        </div>
    );
};
