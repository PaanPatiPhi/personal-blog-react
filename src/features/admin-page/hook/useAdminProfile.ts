// hooks/useAdminProfile.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { UserProfile } from "../types/user";

export function useAdminProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        // ❗ check role
        if (data.role !== "admin") {
          setError("Not an admin");
        } else {
          setProfile(data);
        }
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
}