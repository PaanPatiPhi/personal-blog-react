import NotificationList from "./components/NotificationList";
import type { Notification } from "../hooks/useNotifications";
import { useNotifications } from "../hooks/useNotifications";



export default function NotificationPage() {
  const { notifications, loading } = useNotifications();

  // Map API response to Notification type
  const mappedNotifications = Array.isArray(notifications) ? notifications.map((notif) => ({
    id: parseInt(notif.id),
    userName: notif.username || "Anonymous",
    avatarUrl: notif.profile_pic || undefined,
    action: notif.type === 'comment' ? 'commented' as const : 'liked' as const,
    articleTitle: notif.article_title || "Unknown Article",
    message: notif.comment_content || notif.message,
    timeAgo: notif.created_at,
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
