import { ProfileContext } from "./profile-context.tsx";
import { useAuth } from "@/features/auth/contexts/auth-provider";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import type {
  ProfileData,
  UpdateProfilePayload,
} from "./profile-context.tsx";

/*
  UserProfileProvider
  สำหรับ user ทั่วไป (ไม่ใช่ admin)
*/

export const UserProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
          setProfile(null);
        } else if (data) {
          setProfile({
            id: data.id,
            username: data.username,
            name: data.name,
            email: data.email || "",
            profile_pic: data.profile_pic,
            bio: data.bio,
          });
        }
      } catch (err) {
        console.error("Error:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const updateProfile = async (
    formValues: UpdateProfilePayload
  ) => {
    if (!user) return;

    try {
      
      const updateData: Record<string, string | File | undefined> = {
        name: formValues.name,
        username: formValues.username,
        bio: formValues.bio,
      };

      // Handle image upload if provided
      if (formValues.imageFile) {
        // For now, we'll just update the profile_pic with a placeholder
        // In a real app, you'd upload to Supabase storage first
        updateData.profile_pic = URL.createObjectURL(formValues.imageFile);
      }

      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", user.id)
        .select();

      if (error) throw error;

      // Refetch profile after update
      const { data: refetchData } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (refetchData) {
        setProfile({
          id: refetchData.id,
          username: refetchData.username,
          name: refetchData.name,
          email: refetchData.email || "",
          profile_pic: refetchData.profile_pic,
          bio: refetchData.bio,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const refetch = async () => {
    if (!user) return;
    
    try {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile({
          id: data.id,
          username: data.username,
          name: data.name,
          email: data.email || "",
          profile_pic: data.profile_pic,
          bio: data.bio,
        });
      }
    } catch (error) {
      console.error("Error refetching profile:", error);
    }
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
