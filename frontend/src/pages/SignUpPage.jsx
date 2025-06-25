import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, UserPen, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });

  // Floating particles state
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create floating particles
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }).map(() => ({
      id: Math.random().toString(36).substring(7),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.userName.trim()) {
      toast.error("userName is required");
      return false;
    }
    if (!/^[a-zA-Z0-9_]{3,15}$/.test(formData.userName)) {
      toast.error("userName must be 3–15 characters and contain only letters, numbers, or underscores");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid === true) {
      signup(formData, () => {
        navigate('/info');
      });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-1 bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-500"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, -50, 0, -30, 0],
              x: [0, 10, -10, 5, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated gradient background */}
         {/* <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ background: 'linear-gradient(45deg, #1e3a8a, #4f46e5)' }} // dark indigo to indigo-600
          animate={{
            background: [
              'linear-gradient(45deg, #1e3a8a, #4f46e5)',     // indigo-900 ➝ indigo-600
              'linear-gradient(135deg, #4f46e5, #3b82f6)',     // indigo-600 ➝ blue-500
              'linear-gradient(225deg, #3b82f6, #6366f1)',     // blue-500 ➝ indigo-500
              'linear-gradient(315deg, #6366f1, #1e3a8a)',     // indigo-500 ➝ indigo-900
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        /> */}
      
      </div>

      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-lg space-y-3 p-12">
          <div className="bg-gray-800 rounded-xl p-6 space-y-8">
            
          {/* Logo with animation */}
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors bg-blue-500/10 group-hover:bg-blue-500/20"
                animate={{
                  rotate: [0, 20, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors">
                  <img 
                    src="/account.svg" 
                    alt="Logo" 
                  />
                </div>
                {/* <MessageSquare className="w-5 h-5 text-blue-500" /> */}
              </motion.div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            </motion.div>
          </motion.div>

          {/* Form with staggered animations */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Full Name */}
            <motion.div 
              className="space-y-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-300">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <motion.input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Will Jack"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={isSigningUp}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
            </motion.div>

            {/* Username */}
            <motion.div 
              className="space-y-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-300">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserPen className="w-5 h-5 text-gray-400" />
                </div>
                <motion.input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="will_jack"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  disabled={isSigningUp}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div 
              className="space-y-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <motion.input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="will@jack.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSigningUp}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div 
              className="space-y-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <motion.input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isSigningUp}
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-300 transition-colors disabled:opacity-50"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSigningUp}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              disabled={isSigningUp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </motion.form>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;