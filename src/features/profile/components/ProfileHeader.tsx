// features/profile/components/ProfileHeader.tsx
import { useAuth } from "@/features/auth/context/AuthContext";

type ProfileHeaderProps = {
  activeTab: "profile" | "password";
};

export default function ProfileHeader({ activeTab }: ProfileHeaderProps) {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-4 mb-8">
      <img
        src={user?.image || "/avatar.png"}
        className="w-12 h-12 rounded-full object-cover"
      />

      <span className="text-lg font-semibold text-gray-600">
        {user?.name}
      </span>

      <span className="text-gray-300">|</span>

      <span className="text-lg font-semibold">
        {activeTab === "profile" ? "Profile" : "Reset password"}
      </span>
    </div>
  );
}
