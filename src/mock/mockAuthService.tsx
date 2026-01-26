import { mockUser } from "./mockuser";

export function mockLogin(email: string, password: string) {
  return new Promise<{
    token: string;
    user: { name: string; email: string; image: string; };
  }>((resolve, reject) => {
    setTimeout(() => {
      if (
        email === mockUser.email &&
        password === mockUser.password
      ) {
        resolve({
          token: "mock-token-123",
          user: {
            name: mockUser.name,
            email: mockUser.email,
            image: mockUser.image,
          },
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
}
