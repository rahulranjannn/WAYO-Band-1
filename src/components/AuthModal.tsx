import React, { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wantsNewsletter, setWantsNewsletter] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        alert('Account created! Please check your inbox for an email verification link. You can configure your newsletter preferences in your account settings.');
        onClose();
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try logging in.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError(err.message || 'Failed to authenticate');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email address first.');
      return;
    }
    try {
      setError(null);
      setSuccessMsg(null);
      await sendPasswordResetEmail(auth, email);
      alert('Password reset link sent! Check your email.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email.');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccessMsg(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-wayo-dark/40 backdrop-blur-sm">
      <div className="bg-wayo-cream rounded-[24px] w-full max-w-sm p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-wayo-dark transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-wayo-dark mb-6 font-display text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {/* Top Section: Google Login */}
        <button 
          onClick={handleGoogleSignIn}
          className="w-full bg-white border border-gray-200 text-wayo-dark rounded-xl font-bold text-base py-3.5 mb-6 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <span className="text-gray-400 font-medium text-sm">or</span>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>

        {/* Bottom Section: Email/Password */}
        <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-wayo-coral focus:ring-1 focus:ring-wayo-coral focus:outline-none transition-all text-wayo-dark"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-wayo-coral focus:ring-1 focus:ring-wayo-coral focus:outline-none transition-all text-wayo-dark"
            />
          </div>

          {isLogin && (
            <div className="flex justify-end -mt-2 mb-1">
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-sm font-medium text-wayo-coral hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          {!isLogin && (
            <div className="flex items-center gap-2 mt-1 mb-2">
              <input 
                type="checkbox" 
                id="newsletter" 
                checked={wantsNewsletter}
                onChange={(e) => setWantsNewsletter(e.target.checked)}
                className="w-4 h-4 rounded text-wayo-coral border-gray-300 focus:ring-wayo-coral"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-600 font-medium cursor-pointer">
                Email me with news and offers
              </label>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="text-green-600 text-sm font-medium bg-green-50 p-3 rounded-lg border border-green-100 mt-2">
              {successMsg}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-wayo-dark text-white rounded-xl font-bold text-lg py-3.5 mt-2 hover:bg-gray-800 disabled:bg-gray-400 transition-all shadow-md"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Log In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-medium text-gray-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={toggleMode}
            className="text-wayo-coral font-bold hover:underline"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>

      </div>
    </div>
  );
}
