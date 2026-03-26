// hooks/usePublicAdminProfile.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { UserProfile } from "../types/user";

export function usePublicAdminProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      setLoading(true);

      try {
        // Fetch admin profile without requiring login
        // You can modify this query to get the first admin user or a specific admin
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("role", "admin")
          .limit(1)
          .single();

        if (error) {
          // If no admin found, try to get any user as fallback
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("users")
            .select("*")
            .limit(1)
            .single();

          if (fallbackError) {
            setError("No profile data available");
          } else {
            setProfile(fallbackData);
          }
        } else {
          setProfile(data);
        }
      } catch (err) {
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, []);

  return { profile, loading, error };
}
