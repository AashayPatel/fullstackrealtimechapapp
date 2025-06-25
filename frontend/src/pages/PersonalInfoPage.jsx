import { useState, useEffect } from 'react';
import { Camera, User,  Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PersonalInfoPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [bio, setBio] = useState('');
  const [staatus, setStaatus] = useState('online');
  const [isLoading, setIsLoading] = useState(false);
  
  // Floating particles state
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 15; // Reduced particle count
    const newParticles = Array.from({ length: particleCount }).map(() => ({
      id: Math.random().toString(36).substring(7),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1, // Smaller particles
      duration: Math.random() * 10 + 5, // Faster animation
      delay: Math.random() * 3,
      opacity: Math.random() * 0.2 + 0.1, // More transparent
    }));
    setParticles(newParticles);
  }, []);

  const staatusOptions = [
    { value: 'online', label: 'Online', color: 'bg-green-500', icon: '🟢' },
    { value: 'away', label: 'Away', color: 'bg-yellow-500', icon: '🟡' },
    { value: 'busy', label: 'Busy', color: 'bg-red-500', icon: '🔴' },
    { value: 'offline', label: 'Offline', color: 'bg-gray-500', icon: '⚪' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const formData = new FormData();
    if (profilePic) formData.append("profilePic", profilePic);
    formData.append("bio", bio);
    formData.append("staatus", staatus); // fix typo if necessary

    const res = await fetch("http://localhost:5001/api/auth/update-profile", {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to update");

    toast.success("Profile updated successfully!");
    navigate("/login");
  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};


  const handleSkip = () => {
    navigate('/login');
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-500 animate-pulse"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-3">
          <div className="flex justify-center mb-1">
            <div className="w-13 h-13 rounded-xl bg-blue-900/30 flex items-center justify-center border border-blue-700/50">
              {/* <MessageSquare className="w-8 h-8 text-blue-400" /> */}
              <img 
                    src="/public/account.svg" 
                    alt="Logo" 
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Complete Profile</h1>
          <p className="text-gray-400 text-sm">Add your personal details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture Upload - Compact */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Profile Picture</label>
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
                  {profilePicPreview ? (
                    <img 
                      src={profilePicPreview} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">Click to upload photo</p>
            </div>
          </div>

          {/* Bio - Compact */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others about yourself..."
              className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 resize-none h-20 text-sm"
              maxLength={150}
            />
            <p className="text-xs text-gray-500 text-right">{bio.length}/150</p>
          </div>

          {/* Horizontal Staatus Selector - Compact */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">Status</label>
            <div className="grid grid-cols-4 gap-1">
              {staatusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStaatus(option.value)}
                  className={`flex flex-col items-center p-2 rounded-md transition-all ${
                    staatus === option.value 
                      ? 'bg-gray-700 border border-gray-600' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-xs mt-1">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons - Compact */}
          <div className="flex space-x-3 pt-3">
            <button
              type="button"
              onClick={handleSkip}
              className="flex-1 px-3 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 text-sm"
              disabled={isLoading}
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Continue <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-3">
          <p className="text-gray-500 text-xs">
            Welcome to Shup! 👋
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;