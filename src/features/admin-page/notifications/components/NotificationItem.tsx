import type { Notification } from "../notification.types";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";

interface Props {
  notification: Notification;
  isLast?: boolean;
}

export default function NotificationItem({
  notification,
  isLast,
}: Props) {
  const {
    userName,
    avatarUrl,
    action,
    articleTitle,
    message,
    timeAgo,
  } = notification;
  const navigatte = useNavigate();
  return (
    <li
      className={`flex gap-4 py-6
        ${!isLast ? "border-b border-(--color-brown-300)" : ""}
      `}
    >
      {/* Avatar */}
      <UserAvatar src={avatarUrl} alt={userName} size={36} />

      {/* Content */}
      <div className="flex-1 space-y-1">
        <p className="text-sm text-neutral-700">
          <span className="font-medium text-neutral-900">
            {userName}
          </span>{" "}
          {action === "commented" ? "commented on your article" : "liked your article"}{" "}
          <span className="text-neutral-700 font-medium">
            {articleTitle}
          </span>
        </p>

        {message && (
          <p className="text-sm text-neutral-600 italic">
            "{message}"
          </p>
        )}

        <p className="text-xs text-neutral-500">
          {timeAgo}
        </p>
      </div>

      {/* View */}
      <button
        onClick={() => navigatte(`/posts/${id}`)}
        className="self-start text-sm text-neutral-900 underline"
      >
        View
      </button>
    </li>
  );
}
