import { createContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

/* ======================
   Types
====================== */

export type ProfileData = {
  id: string;
  username: string;
  name: string;
  email: string;
  profile_pic: string;
};

export type UpdateProfilePayload = {
  username?: string;
  name?: string;
  imageFile?: File | null;
};

/* ======================
   Context Type
====================== */

type ProfileContextType = {
  profile: ProfileData | null;
  loading: boolean;
  updateProfile: (data: UpdateProfilePayload) => Promise<void>;
  refetch: () => Promise<void>;
};

/* ======================
   Create Context
   (ยังไม่ใส่ค่า default จริง เพราะจะบังคับใช้ผ่าน Provider)
====================== */

export const ProfileContext = createContext<
  ProfileContextType | undefined
>(undefined);

/* ======================
   Provider Component
   ทำหน้าที่เป็น "single source of truth"
====================== */

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // เก็บ profile กลางของทั้งแอป
  const [profile, setProfile] = useState<ProfileData | null>(null);

  // ใช้บอกสถานะกำลังโหลด
  const [loading, setLoading] = useState(true);

  /* ======================
     Fetch Profile จาก backend
     ใช้ตอน mount หรือเวลาต้องการ refetch
  ====================== */
  const fetchProfile = async () => {
    try {
      const res = await api.get("/me/profile");
      setProfile(res.data); // อัปเดต state กลาง
    } catch (err) {
      console.error("Fetch profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     โหลด profile ครั้งแรกตอน Provider mount
  ====================== */
  useEffect(() => {
    fetchProfile();
  }, []);

  /* ======================
     Update Profile
     หลัง update สำเร็จ จะ setProfile ทันที
     ทุก component ที่ใช้ context นี้จะ re-render
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

    const res = await api.put("/me/profile", formData);

    // 🔥 จุดสำคัญ: update state กลางทันที
    setProfile(res.data);
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