import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ProfileContext } from "./Profile-context";
import type {
  ProfileData,
  UpdateProfilePayload,
} from "./Profile-context";

/*
  ProfileProvider
  Single source of truth สำหรับ profile ทั้งแอป
*/

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  /* ======================
     Fetch profile
  ====================== */
  const fetchProfile = async () => {
    try {
      const res = await api.get("/me/profile");
      setProfile(res.data);
    } catch (err) {
      console.error("Fetch profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* โหลดครั้งแรกตอน mount */
  useEffect(() => {
    fetchProfile();
  }, []);

  /* ======================
     Update profile
     หลัง update สำเร็จ → fetch ใหม่จาก server
  ====================== */
  const updateProfile = async (
    formValues: UpdateProfilePayload
  ) => {
    const formData = new FormData();

    if (formValues.username !== undefined) {
      formData.append("username", formValues.username);
    }

    if (formValues.name !== undefined) {
      formData.append("name", formValues.name);
    }

    if (formValues.imageFile) {
      formData.append("imageFile", formValues.imageFile);
    }

    try {
      await api.put("/me/profile", formData);

      // 🔥 สำคัญ: ดึงข้อมูลใหม่จาก backend
      const fresh = await api.get("/me/profile");

      setProfile(fresh.data);
    } catch (err) {
      console.error("Update profile error:", err);
      throw err;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        updateProfile,
        refetch: fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};