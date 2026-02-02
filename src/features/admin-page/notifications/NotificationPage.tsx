import NotificationList from "./components/NotificationList";
import type { Notification } from "./notification.types";



export default function NotificationPage() {
  const notifications: Notification[] = [
    {
      id: 1,
      userName: "Jacob Lash",
      avatarUrl: "/avatars/jacob.png",
      action: "commented",
      articleTitle:
        "The Fascinating World of Cats: Why We Love Our Furry Friends",
      message:
        "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.",
      timeAgo: "4 hours ago",
    },
    {
      id: 2,
      userName: "Jacob Lash",
      avatarUrl: "/avatars/jacob.png",
      action: "liked",
      articleTitle:
        "The Fascinating World of Cats: Why We Love Our Furry Friends",
      timeAgo: "4 hours ago",
    },
  ];

  return (
    <div className="px-15">
      {/* Header */}
      <h1 className="pb-6 text-xl font-semibold border-b border-(--color-brown-300)">
        Notification
      </h1>

      {/* List */}
      <NotificationList notifications={notifications} />
    </div>
  );
}
