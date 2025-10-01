import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { authAPI } from '../services/api';
import { useMealyContext } from '../context/ContextProvider';

const SignIn = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useMealyContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Load Google Sign-In API
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com',
          callback: handleGoogleResponse
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('All fields required');
    if (!form.email.includes('@')) return setError('Invalid email');

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login({
        email: form.email,
        password: form.password
      });

      localStorage.setItem('token', response.access_token);
      localStorage.setItem('userData', JSON.stringify(response.user));
      localStorage.setItem('isAuthenticated', 'true');
      setCurrentUser(response.user);

      if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleResponse = async (response) => {
    setLoading(true);
    setError('');

    try {
      const result = await authAPI.googleAuth(response.credential);

      localStorage.setItem('token', result.access_token);
      localStorage.setItem('userData', JSON.stringify(result.user));
      localStorage.setItem('isAuthenticated', 'true');
      setCurrentUser(result.user);

      if (result.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      setError('Google Sign-In not loaded. Please refresh the page.');
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      if (!window.AppleID) {
        throw new Error('Apple Sign In not loaded');
      }

      const response = await window.AppleID.auth.signIn();

      const result = await authAPI.appleAuth(
        response.authorization.id_token,
        response.authorization.code,
        response.user
      );

      localStorage.setItem('token', result.access_token);
      localStorage.setItem('userData', JSON.stringify(result.user));
      localStorage.setItem('isAuthenticated', 'true');
      setCurrentUser(result.user);

      if (result.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      if (err.error !== 'popup_closed_by_user') {
        setError(err.message || 'Apple sign-in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8" style={{backgroundColor: '#EB5C5C'}}>
        <div className="w-full max-w-md space-y-4">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-white text-opacity-90 text-lg">Sign in to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              value={form.email} 
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all disabled:opacity-50" 
            />
            
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full p-3 pr-12 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-opacity-80 transition-all focus:outline-none disabled:opacity-50"
                disabled={loading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-white text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2" />
                <span>Remember me</span>
              </label>
              <button type="button" className="underline hover:text-opacity-80">
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="text-white text-sm bg-red-900 bg-opacity-60 p-3 rounded-lg border border-white border-opacity-20">
                ⚠️ {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-white hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              style={{backgroundColor: '#2E6A2E'}}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white border-opacity-30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white font-medium">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center py-3 border border-white border-opacity-30 rounded-lg text-white bg-white bg-opacity-10 hover:bg-opacity-20 transition-all disabled:opacity-50"
            >
              <FcGoogle className="mr-2" size={24} /> Sign in with Google
            </button>

            <button
              type="button"
              onClick={handleAppleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center py-3 border border-white border-opacity-30 rounded-lg text-white bg-white bg-opacity-10 hover:bg-opacity-20 transition-all disabled:opacity-50"
            >
              <AiFillApple className="mr-2" size={24} /> Sign in with Apple
            </button>

            <div className="text-center text-white text-sm pt-4">
              Don't have an account? {' '}
              <button 
                onClick={() => navigate('/signup')} 
                className="underline font-semibold hover:text-opacity-80 transition-all"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right Side - Illustration */}
      <div className="flex-1 hidden lg:block relative overflow-hidden">
        <img 
          src="/signup-illustration.png" 
          alt="Food illustration" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black opacity-10"></div>
      </div>
    </div>
  );
};

export default SignIn;