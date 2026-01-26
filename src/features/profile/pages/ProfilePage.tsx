import { useSearchParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ProfileForm from "../components/ProfileForm";
import ResetPasswordForm from "../components/resetpassword/ResetPasswordForm";

type Tab = "profile" | "password";

export default function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = (searchParams.get("tab") as Tab) || "profile";

  const changeTab = (nextTab: Tab) => {
    setSearchParams({ tab: nextTab });
  };

  return (
    <div className="max-w-[1217px] mx-auto px-6 py-10">
      
      {/* Header */}
      <ProfileHeader activeTab={tab} />

      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="w-56 space-y-2">
          <button
            className={`w-full px-4 py-2 text-left rounded ${
              tab === "profile" ? "bg-gray-100 font-medium" : ""
            }`}
            onClick={() => changeTab("profile")}
          >
            Profile
          </button>

          <button
            className={`w-full px-4 py-2 text-left rounded ${
              tab === "password" ? "bg-gray-100 font-medium" : ""
            }`}
            onClick={() => changeTab("password")}
          >
            Reset password
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1">
          {tab === "profile" && <ProfileForm />}
          {tab === "password" && <ResetPasswordForm />}
        </main>
      </div>
    </div>
  );
}
