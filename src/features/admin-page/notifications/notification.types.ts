export type NotificationAction = "commented" | "liked";

export interface Notification {
  id: number;
  userName: string;
  avatarUrl?: string; // ✅ เพิ่มรูป user (optional)
  action: NotificationAction;
  articleTitle: string;
  message?: string;
  timeAgo: string;
}
