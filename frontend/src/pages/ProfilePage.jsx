import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, UserPen, User, Save, X } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    staatus: "online"
  });

  // Sync form data with authUser when it changes
  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        bio: authUser.bio || "",
        staatus: authUser.staatus || "online"
      });
    }
  }, [authUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    setSelectedImg(URL.createObjectURL(file));
    await updateProfile({ profilePic: file });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (staatus) => {
    setFormData(prev => ({
      ...prev,
      staatus
    }));
  };

  const handleSave = async () => {
    try {
      // Ensure we're sending all required fields
      await updateProfile({
        fullName: formData.fullName,
        bio: formData.bio,
        staatus: formData.staatus
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: authUser?.fullName || "",
      bio: authUser?.bio || "",
      staatus: authUser?.staatus || "online"
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2 text-gray-400">Your profile information</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 flex items-center gap-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
                >
                  <X size={18} /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isUpdatingProfile}
                  className="px-4 py-2 flex items-center gap-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Save size={18} /> {isUpdatingProfile ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Profile Picture */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={selectedImg || authUser?.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-gray-700"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0 
                    bg-gray-600 hover:bg-gray-500 hover:scale-105
                    p-2 rounded-full cursor-pointer 
                    transition-all duration-200
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-5 h-5 text-gray-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-400 text-center">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* Right Column - Profile Details */}
            <div className="w-full md:w-2/3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  ) : (
                    <p className="px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600">
                      {authUser?.fullName || "No name set"}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <p className="px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600">
                    {authUser?.email}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <UserPen className="w-4 h-4" />
                    Username
                  </div>
                  <p className="px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600">
                    {authUser?.userName}
                  </p>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-1.5">
                <div className="text-sm text-gray-400">Bio</div>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="px-4 py-2.5 bg-gray-700 rounded-lg border border-gray-600 min-h-24">
                    {authUser?.bio || "No bio added yet"}
                  </div>
                )}
              </div>

              {/* Status Section */}
              <div className="space-y-1.5">
                <div className="text-sm text-gray-400">Status</div>
                <div className="flex gap-2">
                  {['online', 'away', 'busy', 'offline'].map((status) => (
                    <button
                      key={status}
                      type={isEditing ? "button" : "button"}
                      onClick={isEditing ? () => handleStatusChange(status) : null}
                      className={`px-3 py-1 rounded-full text-xs ${
                        (isEditing ? formData.staatus : authUser?.staatus) === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="mt-8 bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Member Since</span>
                <span>{new Date(authUser?.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;