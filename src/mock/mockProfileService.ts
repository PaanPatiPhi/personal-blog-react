// mock/mockProfileService.ts
import { mockUser } from "./mockuser";

export function updateProfile(data: {
  name: string;
  username: string;
  image?: string;
}) {
  return new Promise<typeof mockUser>((resolve) => {
    setTimeout(() => {
      mockUser.name = data.name;
      mockUser.username = data.username;
      if (data.image) mockUser.image = data.image;
      resolve(mockUser);
    }, 500);
  });
}

export function resetPassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (data.currentPassword !== mockUser.password) {
        reject(new Error("Current password is incorrect"));
      }
      mockUser.password = data.newPassword;
      resolve();
    }, 500);
  });
}
