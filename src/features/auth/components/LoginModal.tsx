import React, { useState } from "react";
import { useAuth } from "../contexts/auth-provider";

export default function LoginModal() {
  const { loginModalOpen, closeLoginModal, userLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!loginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await userLogin({ email, password });
    } catch (e: unknown) {
      const error = e as Error;
      setErr(error?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Log in</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-2 px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          {err && <div className="text-red-500 mb-2">{err}</div>}
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={closeLoginModal} className="px-4 py-2 rounded border">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="bg-black text-white px-4 py-2 rounded">
              {loading ? "Logging..." : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}