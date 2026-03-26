import { useState, useEffect, useRef } from "react";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "@/features/auth/contexts/auth-provider";
import LoadingPage from "@/shared/layout/loading/Loading";
import avatar from "../../../assets/image/profile/avatar.png"
import Toast from "@/shared/components/Toast";

export default function ProfileForm() {
  const { profile, loading: profileLoading, updateProfile, refetch } = useProfile();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

//toast
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setUsername(profile.username ?? "");
      setPreview(profile.profile_pic ?? null);
    }
  }, [profile]);

  if (profileLoading) return <LoadingPage />;
  if (!user) return <p>Please login to view profile</p>;
  if (!profile) return <p>No profile data found</p>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    // preview ทันที
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();   // กันหน้า reload

  try {
    setLoading(true);

    await updateProfile({
      name,
      username,
      imageFile
    });

    // Success
    setToastTitle("Success");
    setToastDescription("Your profile has been successfully updated.");
    setToastType("success");
    setShowToast(true);
    setImageFile(null);
    
    // Refetch profile to show updated data
    await refetch?.();
    
    setTimeout(() => setShowToast(false), 3000);

  } catch (err) {
    console.error("Error updating profile:", err);
    setToastTitle("Error");
    setToastDescription("Failed to update profile. Please try again.");
    setToastType("error");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  } finally {
    setLoading(false);
  }
};

  return (
<form
  onSubmit={handleSubmit}
  className="bg-(--color-brown-200) p-10 rounded-2xl w-[550px]"
>      <div className="flex items-center gap-4 mb-4">
        <img
          src={preview || avatar}
          className="w-20 h-20 rounded-full object-cover"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="border px-7 py-2 rounded-full text-sm bg-white"
        >
          Upload profile picture
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />
      </div>

      <hr className="w-[95%] my-9 text-(--color-brown-300)" />

      <label className="block text-sm mb-1 text-(--color-brown-400)">Name</label>
      <input
        className="w-full mb-3 p-2 bg-white rounded-xl border-(--color-brown-300)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block text-sm mb-1 text-(--color-brown-400)">Username</label>
      <input
        className="w-full mb-3 p-2 bg-white rounded-xl border-(--color-brown-300)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />


      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-black text-white px-8 py-2 rounded-full"
      >
        {loading ? "Saving..." : "Save"}
      </button>

      <Toast
  show={showToast}
  title={toastTitle}
  description={toastDescription}
  type={toastType}
/>
    </form>


  );
}