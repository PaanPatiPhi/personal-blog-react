import { ProfileContext } from "./profile-context.tsx";
import { usePublicAdminProfile } from "@/features/admin-page/hook/usePublicAdminProfile";
import type {
  ProfileData,
} from "./profile-context.tsx";

/*
  PublicProfileProvider
  สำหรับแสดง profile แบบ public ไม่ต้อง login
*/

export const PublicProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { profile: adminProfile, loading } = usePublicAdminProfile();

  // Transform admin profile to match ProfileData format
  const profile: ProfileData | null = adminProfile ? {
    id: adminProfile.id,
    username: adminProfile.username,
    name: adminProfile.name,
    email: adminProfile.email || "",
    profile_pic: adminProfile.profile_pic,
    bio: adminProfile.bio,
  } : null;

  const updateProfile = async () => {
    // Public profile provider doesn't support updates
    throw new Error("Cannot update profile in public mode");
  };

  const refetch = async () => {
    // This will be handled by the usePublicAdminProfile hook's refetch mechanism
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        updateProfile,
        refetch,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
