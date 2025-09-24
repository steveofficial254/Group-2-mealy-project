import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return setError('All fields required');
    if (!form.email.includes('@')) return setError('Invalid email');
    if (form.password.length < 6) return setError('Password too short');
    if (!agreed) return setError('Must agree to terms');
    setError('');
    navigate('/home');
  };

  const socialLogin = (type) => navigate('/home');

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center p-8" style={{backgroundColor: '#EB5C5C'}}>
        <div className="w-full max-w-md space-y-4">
          <h1 className="text-4xl font-bold text-white mb-8">Mealy</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Enter your name" value={form.name} onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70" />
            
            <input name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70" />
            
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70" />

            <label className="flex items-center text-white text-sm">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mr-2" />
              I agree to the <span className="underline ml-1">terms & policy</span>
            </label>

            {error && <div className="text-white text-sm bg-red-600 bg-opacity-50 p-2 rounded">{error}</div>}

            <button type="submit" className="w-full py-3 rounded-lg font-bold text-white" 
              style={{backgroundColor: '#2E6A2E'}}>Signup</button>

            <div className="text-center text-white">Or</div>

            <button type="button" onClick={() => socialLogin('Google')} 
              className="w-full flex items-center justify-center py-3 border border-white border-opacity-30 rounded-lg text-white">
              <FcGoogle className="mr-2" /> Sign in with Google
            </button>

            <button type="button" onClick={() => socialLogin('Apple')} 
              className="w-full flex items-center justify-center py-3 border border-white border-opacity-30 rounded-lg text-white">
              <AiFillApple className="mr-2" /> Sign in with Apple
            </button>

            <div className="text-center text-white text-sm">
              Have an account? <button onClick={() => navigate('/signin')} className="underline">Sign In</button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="flex-1 hidden lg:block">
        <img src="/signup-illustration.png" alt="Food illustration" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Signup;