// features/profile/components/ProfileForm.tsx
import { useState } from "react";
import { updateProfile } from "@/mock/mockProfileService";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function ProfileForm() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [username, setUsername] = useState("moodeng.cute");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await updateProfile({ name, username });
    setLoading(false);
    alert("Profile updated");
  };

  return (
    <div className="bg-(--color-brown-200) p-10 rounded-2xl w-[550px]">
      <div className="flex items-center gap-4 mb-4">
        <img src={user?.image} className="w-20 h-20 rounded-full" />
        <button className="border px-7 py-2 rounded-full text-sm bg-white">
          Upload profile picture
        </button>
      </div>
    <hr className="w-[95%] my-9 text-(--color-brown-300)"/>
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

      <label className="block text-sm mb-4 text-gray-400">Email</label>
      <input
        disabled
        className="w-full p-2 rounded text-(--color-brown-300)"
        value={user?.email}
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-4 bg-black text-white px-8 py-2 rounded-full"
      >
        Save
      </button>
    </div>
  );
}
