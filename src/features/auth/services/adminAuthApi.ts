// services/adminAuthApi.ts
export type AdminLoginPayload = {
  email: string;
  password: string;
};

export async function adminLogin(payload: AdminLoginPayload) {
  // mock API
  if (
    payload.email === "admin@e.com" &&
    payload.password === "admin"
  ) {
    return { token: "admin-token" };
  }

  throw new Error("INVALID_CREDENTIAL");
}
