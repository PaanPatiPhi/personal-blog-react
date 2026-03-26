// types/user.ts
export type UserProfile = {
  id: string;
  username: string;
  name: string;
  email: string | null;
  profile_pic: string | null;
  bio: string | null;
  role: "admin" | "user";
};