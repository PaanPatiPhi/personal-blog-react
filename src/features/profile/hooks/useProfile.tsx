import { useEffect, useState } from "react";
import { api } from "@/lib/api";

/**
 * type ของ profile
 */
type profileData = {
  id: string;
  username: string;
  name:string;
  email: string;
  profile_pic: string;
};

type UpdateProfilePayload = {
  username?: string;
  name?: string;
  imageFile?: File | null;
};


export const useProfile = () => {
  const [profile, setProfile] = useState<profileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile...");

        // ยิง request ผ่าน api instance (token จะถูกแนบอัตโนมัติ)
        const res = await api.get("/me/profile");

        setProfile(res.data);
      } catch (err) {
        setError(err);
        console.error("Fetch profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


const updateProfile = async (formValues: UpdateProfilePayload) => {
  const token = localStorage.getItem("token");

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

  const response = await api.put(
    "/me/profile",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
  return { profile, loading, error , updateProfile};
};
