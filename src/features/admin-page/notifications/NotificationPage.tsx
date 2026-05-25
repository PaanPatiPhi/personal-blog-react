import NotificationList from "./components/NotificationList";
import { useNotifications } from "../hooks/useNotifications";

export default function NotificationPage() {
  const { notifications, loading } = useNotifications();

  // Map API response to Notification type
  const mappedNotifications = Array.isArray(notifications) ? notifications.map((notif) => ({
    id: notif.id,
    userName: notif.userName || "Anonymous",
    avatarUrl: notif.avatarUrl || notif.profile_pic || undefined,
    action: notif.action || 'commented' as const,
    article_title: notif.article_title || "Unknown Article",
    message: notif.message,
    timeAgo: notif.timeAgo,
    created_at: notif.created_at,
    is_read: notif.is_read,
    article_id: notif.article_id,
  })) : [];

  if (loading) {
    return (
      <div className="px-15">
        <h1 className="pb-6 text-xl font-semibold border-b border-(--color-brown-300)">
          Notification
        </h1>
        <div className="py-8 text-center text-gray-500">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="px-15">
      {/* Header */}
      <h1 className="pb-6 text-xl font-semibold border-b border-(--color-brown-300)">
        Notification
      </h1>

      {/* List */}
      <NotificationList notifications={mappedNotifications} />
    </div>
  );
}
