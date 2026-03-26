import { createContext, useContext } from "react";

/* ======================
   Types
====================== */

export type ProfileData = {
  id: string;
  username: string;
  name: string;
  email: string;
  profile_pic: string | null;
  bio: string | null;
};

export type UpdateProfilePayload = {
  username?: string;
  name?: string;
  bio?: string;
  imageFile?: File | null;
};

export type ProfileContextType = {
  profile: ProfileData | null;
  loading: boolean;
  updateProfile: (data: UpdateProfilePayload) => Promise<void>;
  refetch: () => Promise<void>;
};

/* ======================
   Context
====================== */

export const ProfileContext =
  createContext<ProfileContextType | undefined>(undefined);

/* ======================
   Hook
====================== */

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};