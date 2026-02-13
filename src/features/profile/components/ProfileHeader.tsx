// features/profile/components/ProfileHeader.tsx
import {useProfile} from "../hooks/useProfile"

type ProfileHeaderProps = {
  activeTab: "profile" | "password";
};

export default function ProfileHeader({ activeTab }: ProfileHeaderProps) {
  const profile = useProfile().profile as { name?: string; profile_pic?: string } | null;
  return (
    <div className="flex items-center gap-4 mb-8">
      <img
        src={profile?.profile_pic|| "/avatar.png"}
        className="w-12 h-12 rounded-full object-cover"
      />

      <span className="text-lg font-semibold text-gray-600">
        {profile?.name}
      </span>

      <span className="text-gray-300">|</span>

      <span className="text-lg font-semibold">
        {activeTab === "profile" ? "Profile" : "Reset password"}
      </span>
    </div>
  );
}
