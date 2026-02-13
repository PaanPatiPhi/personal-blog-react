import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileProvider";

/*
  Custom hook สำหรับดึง profile จาก Context
  บังคับให้ใช้ภายใน ProfileProvider เท่านั้น
*/

export const useProfile = () => {
  const context = useContext(ProfileContext);

  // ป้องกันการเรียกใช้โดยไม่ครอบด้วย Provider
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }

  return context;
};