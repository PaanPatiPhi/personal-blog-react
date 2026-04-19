import { useState, useEffect } from "react";
import Toast from "@/shared/components/Toast";
import { useAdminProfile } from "../hook/useAdminProfile";
import {useUpdateAdminProfile} from "../hook/useUpdateAdminProfile";
import LoadingPage from "@/shared/layout/loading/Loading";

/**
 * type สำหรับ form profile
 * แยกไว้ชัดเจน เพื่อให้แก้ง่ายและ type-safe
 */
type ProfileForm = {
  name: string;
  username: string;
  email: string;
  bio: string;
  profile_pic: string; // url รูป profile (matching database field)
};



export default function ProfileManagement() {
  const { profile, loading } = useAdminProfile();
  const { updateProfile } = useUpdateAdminProfile();
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  // Initialize form with empty values - will be populated by API data
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    username: "",
    email: "",
    bio: "",
    profile_pic: "",
  });

  // เมื่อ profile โหลดจาก Supabase ให้อัพเดท form
  useEffect(() => {
    if (profile && !loading) {
      setForm({
        name: profile.name || "",
        username: profile.username || "",
        email: profile.email || "",
        bio: profile.bio || "",
        profile_pic: profile.profile_pic || "",
      });
    }
  }, [profile, loading]);

  /**
   * handle เปลี่ยนค่าฟอร์มแบบ generic
   * ลดการเขียน onChange ซ้ำ ๆ
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * handle upload รูป profile
   * ตอนนี้เป็นแค่ preview (ยังไม่ upload จริง)
   */
  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // สร้าง url สำหรับ preview รูป
    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, profile_pic: previewUrl }));
  };

  /**
   * handle save profile
   * จุดนี้ปกติจะเรียก updateProfile จาก hook จริงๆ
   */
  const handleSave = async () => {
    try {
      await updateProfile(form);
      
      // Success feedback
      setToastTitle("Profile updated successfully!");
      setToastDescription("Your profile has been updated.");
      setToastType("success");
      setShowToast(true);
      
      // Hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      // Error feedback
      setToastTitle("Update failed");
      setToastDescription((error as Error).message || "Please try again.");
      setToastType("error");
      setShowToast(true);
      
      setTimeout(() => setShowToast(false), 3000);
    }
  };
if(loading) return <LoadingPage />
  return (
    <div className="space-y-6 px-15">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between border-b pb-4 border-(--color-brown-300)">
        <h1 className="text-xl font-semibold">Profile</h1>

        <button
          onClick={handleSave}
          className="rounded-full bg-black px-6 py-2 text-sm text-white"
        >
          Save
        </button>
      </div>

      {/* ===== Avatar ===== */}
      <div className="flex items-center gap-6">
        {form.profile_pic ? (
          <img
            src={form.profile_pic}
            alt="profile"
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        <label className="cursor-pointer rounded-full border px-4 py-2 text-sm">
          Upload profile picture
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadAvatar}
          />
        </label>
      </div>

      {/* ===== Divider ===== */}
      <hr className="text-(--color-brown-300)"/>

      {/* ===== Name ===== */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded border px-4 py-2 text-sm text-(--color-brown-400) border-(--color-brown-300) bg-white"
        />
      </div>

      {/* ===== Username ===== */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">Username</label>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full rounded border px-4 py-2 text-sm text-(--color-brown-400) border-(--color-brown-300) bg-white"
        />
      </div>

      {/* ===== Email ===== */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded border px-4 py-2 text-sm text-(--color-brown-400) border-(--color-brown-300)bg-white"
        />
      </div>

      {/* ===== Bio ===== */}
      <div className="space-y-2">
        <label className="text-sm text-(--color-brown-400)">
          Bio (max 120 letters)
        </label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={4}
          maxLength={120}
          className="w-full rounded border px-4 py-2 text-sm text-(--color-brown-400) border-(--color-brown-300) bg-white"
        />
        <div className="text-right text-xs text-(--color-brown-400)">
          {form.bio.length} / 120
        </div>
      </div>

      {/* ===== Toast ===== */}
      <Toast
  show={showToast}
  title={toastTitle}
  description={toastDescription}
  type={toastType}
/>

    </div>
  );
}
