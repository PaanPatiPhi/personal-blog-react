// hooks/useUpdateAdminProfile.ts
import { useState } from "react";
import { supabase } from "@/lib/supabase";

type UpdatePayload = {
  name?: string;
  bio?: string;
  profile_pic?: string;
};

export function useUpdateAdminProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (payload: UpdatePayload) => {
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    // 🔒 update เฉพาะตัวเอง
    const { error } = await supabase
      .from("users")
      .update(payload)
      .eq("id", user.id);

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return { updateProfile, loading, error };
}