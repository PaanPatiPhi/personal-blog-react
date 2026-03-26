import { ProfileContext } from "./profile-context.tsx";
import { useAdminProfile } from "@/features/admin-page/hook/useAdminProfile";
import { useUpdateAdminProfile } from "@/features/admin-page/hook/useUpdateAdminProfile";
import type {
  ProfileData,
  UpdateProfilePayload,
} from "./profile-context.tsx";

/*
  ProfileProvider
  Single source of truth สำหรับ profile ทั้งแอป
*/

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { profile: adminProfile, loading } = useAdminProfile();
  const { updateProfile: updateAdminProfile } = useUpdateAdminProfile();

  // Transform admin profile to match ProfileData format
  const profile: ProfileData | null = adminProfile ? {
    id: adminProfile.id,
    username: adminProfile.username,
    name: adminProfile.name,
    email: adminProfile.email || "",
    profile_pic: adminProfile.profile_pic,
    bio: adminProfile.bio,
  } : null;

  /* ======================
     Update profile
  ====================== */
  const updateProfile = async (
    formValues: UpdateProfilePayload
  ) => {
    if (!adminProfile) return;

    const updateData = {
      name: formValues.name,
      username: formValues.username,
      bio: formValues.bio,
      profile_pic: formValues.imageFile ? URL.createObjectURL(formValues.imageFile) : adminProfile.profile_pic || undefined,
    };

    await updateAdminProfile(updateData);
  };

  const refetch = async () => {
    // This will be handled by the useAdminProfile hook's refetch mechanism
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