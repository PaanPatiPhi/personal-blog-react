import type { Notification } from "../notification.types";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";

// Time formatting function
const formatTimeAgo = (timestamp: string | Date) => {
  // Handle if timestamp is already a Date object or ISO string
  let date: Date;
  
  console.log("Input timestamp:", timestamp);
  console.log("Input type:", typeof timestamp);
  
  if (typeof timestamp === 'string') {
    // Check if it's an ISO timestamp format
    if (timestamp.includes('T') && timestamp.includes('Z')) {
      // Parse UTC timestamp and convert to local time
      date = new Date(timestamp);
      console.log("Parsed as ISO (UTC):", date);
      console.log("Local time:", date.toLocaleString());
    } else {
      // If it's not ISO format, try to parse it differently
      date = new Date(timestamp);
      console.log("Parsed as non-ISO:", date);
    }
  } else {
    date = timestamp;
    console.log("Using as Date object:", date);
  }
  
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  console.log("Time difference (seconds):", seconds);
  console.log("Now:", now);
  console.log("Date object:", date);
  
  if (seconds < 60) {
    const result = 'just now';
    console.log("Time ago result:", result);
    return result;
  }
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    const result = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    console.log("Time ago result:", result);
    return result;
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    const result = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    console.log("Time ago result:", result);
    return result;
  }
  
  const days = Math.floor(hours / 24);
  if (days < 7) {
    const result = `${days} day${days > 1 ? 's' : ''} ago`;
    console.log("Time ago result:", result);
    return result;
  }
  
  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    const result = `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    console.log("Time ago result:", result);
    return result;
  }
  
  const months = Math.floor(days / 30);
  if (months < 12) {
    const result = `${months} month${months > 1 ? 's' : ''} ago`;
    console.log("Time ago result:", result);
    return result;
  }
  
  const years = Math.floor(days / 365);
  const result = `${years} year${years > 1 ? 's' : ''} ago`;
  console.log("Time ago result:", result);
  return result;
};


interface Props {
  notification: Notification;
  isLast?: boolean;
}

export default function NotificationItem({
  notification,
  isLast,
}: Props) {
  const {
    id,
    userName,
    avatarUrl,
    action,
    articleTitle,
    message,
    timeAgo,
    created_at,
    comment_content,
  } = notification;
  
  const navigate = useNavigate();
  
  // Format time from created_at timestamp
  const formattedTimeAgo = created_at ? formatTimeAgo(created_at) : timeAgo;
  
  // Debug logs
  console.log("Full notification data:", notification);
  console.log("Raw timestamp (created_at):", created_at);
  console.log("Fallback timeAgo:", timeAgo);
  console.log("timeAgo type:", typeof timeAgo);
  console.log("Formatted time ago:", formattedTimeAgo);
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
            "{action === "commented" ? comment_content || message : message}"
          </p>
        )}

        <p className="text-xs text-neutral-500">
          {formattedTimeAgo}
        </p>
      </div>

      {/* View */}
      <button
        onClick={() => navigate(`/posts/${id}`)}
        className="self-start text-sm text-neutral-900 underline"
      >
        View
      </button>
    </li>
  );
}
