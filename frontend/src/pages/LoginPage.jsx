import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { motion } from "framer-motion";


const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const [particles, setParticles] = useState([]);

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmail = formData.emailOrUsername.includes("@");
    const loginData = isEmail
      ? { email: formData.emailOrUsername, password: formData.password }
      : { userName: formData.emailOrUsername, password: formData.password };

    login(loginData, () => navigate("/"));
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-1 bg-gray-900 text-white relative overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-blue-500 dark:bg-blue-400"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -50, 0, -30, 0],
              x: [0, 10, -10, 5, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 opacity-10 dark:opacity-20"
          initial={{ background: "linear-gradient(45deg, #3b82f6, #8b5cf6)" }}
          animate={{
            background: [
              "linear-gradient(45deg, #3b82f6, #8b5cf6)",
              "linear-gradient(135deg, #8b5cf6, #ec4899)",
              "linear-gradient(225deg, #ec4899, #3b82f6)",
              "linear-gradient(315deg, #3b82f6, #8b5cf6)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white/90 dark:bg-gray-900/80 relative z-10">
        <div className="w-full max-w-sm space-y-8">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-xl p-6 space-y-8 shadow-xl">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div className="flex flex-col items-center gap-2 group" whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-500/20 transition-colors"
                  animate={{ rotate: [0, 7, -7, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                >
                  <img src="/login.svg" alt="Logo" className="w-8 h-8" />
                </motion.div>
                <h1 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">Welcome Back</h1>
                <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.form onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
              {/* Email / Username */}
              <motion.div className="space-y-2" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email or Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {formData.emailOrUsername.includes("@") ? (
                      <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg 
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                               placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-transparent
                               hover:border-gray-400 dark:hover:border-gray-600"
                    placeholder="you@example.com or username"
                    value={formData.emailOrUsername}
                    onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                    disabled={isLoggingIn}
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div className="space-y-2" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg 
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                               placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-transparent
                               hover:border-gray-400 dark:hover:border-gray-600"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoggingIn}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoggingIn}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
                           dark:bg-blue-500 dark:hover:bg-blue-600 dark:disabled:bg-blue-400 
                           text-white font-medium py-3 px-4 rounded-lg 
                           focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                           focus:ring-offset-white dark:focus:ring-offset-gray-900 
                           disabled:cursor-not-allowed transition-all duration-200 
                           flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                disabled={isLoggingIn}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </motion.form>

            {/* Bottom link */}
            <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 font-medium hover:underline transition-colors">
                  Create account
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;