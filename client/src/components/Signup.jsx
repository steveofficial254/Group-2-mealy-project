import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { authAPI } from '../services/api';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return setError('All fields required');
    if (!form.email.includes('@')) return setError('Invalid email');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    if (!agreed) return setError('Must agree to terms');

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register({
        full_name: form.name,
        email: form.email,
        password: form.password,
        role: 'customer'
      });

      localStorage.setItem('userData', JSON.stringify(response));
      navigate('/signin');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = (type) => {
    localStorage.setItem('loginMethod', type);
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8" style={{backgroundColor: '#EB5C5C'}}>
        <div className="w-full max-w-md space-y-4">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-2">Welcome to Mealy</h1>
            <p className="text-white text-opacity-90 text-lg">Create your account to get started!</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              name="name" 
              placeholder="Enter your name" 
              value={form.name} 
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all" 
            />
            
            <input 
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              value={form.email} 
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all" 
            />
            
            <input 
              name="password" 
              type="password" 
              placeholder="Password (min 6 characters)" 
              value={form.password} 
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all" 
            />

            <label className="flex items-start text-white text-sm cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                className="mr-2 mt-1 cursor-pointer" 
              />
              <span>I agree to the <span className="underline font-medium">terms & policy</span></span>
            </label>

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
              {loading ? 'Creating Account...' : 'Create Account'}
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
              onClick={() => socialLogin('Google')}
              className="w-full flex items-center justify-center py-3 border border-white border-opacity-30 rounded-lg text-white bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
            >
              <FcGoogle className="mr-2" size={24} /> Sign up with Google
            </button>

            <button 
              type="button" 
              onClick={() => socialLogin('Apple')}
              className="w-full flex items-center justify-center py-3 border border-white border-opacity-30 rounded-lg text-white bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
            >
              <AiFillApple className="mr-2" size={24} /> Sign up with Apple
            </button>

            <div className="text-center text-white text-sm pt-4">
              Already have an account? {' '}
              <button 
                onClick={() => navigate('/signin')} 
                className="underline font-semibold hover:text-opacity-80 transition-all"
              >
                Sign In
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

export default Signup;