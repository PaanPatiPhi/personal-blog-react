import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseAuth } from "@/lib/supabaseAuth";
import toast from "react-hot-toast";

export default function AdminSetupPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSetAdmin = async () => {
    if (!email) {
      toast.error("Please enter an email");
      return;
    }

    try {
      setLoading(true);
      
      // Get current user
      const user = await supabaseAuth.getCurrentUser();
      
      if (!user) {
        toast.error("No user logged in");
        return;
      }

      if (user.email !== email) {
        toast.error("Logged in user email doesn't match");
        return;
      }

      // Update user metadata to set role as admin
      await supabaseAuth.updateUserMetadata({
        role: 'admin'
      });

      toast.success(`User ${email} has been set as admin!`);
      
      // Redirect to admin dashboard after 2 seconds
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
      
    } catch (error) {
      console.error('Error setting user as admin:', error);
      toast.error("Failed to set admin role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Setup
            </h1>
            <p className="text-gray-600 mb-6">
              Set your account as admin to access admin features
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <button
              onClick={handleSetAdmin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Setting Admin Role..." : "Set as Admin"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
