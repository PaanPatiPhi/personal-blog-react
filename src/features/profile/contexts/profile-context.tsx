import { createContext } from "react";

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