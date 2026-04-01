export type NotificationAction = "commented" | "liked";

export interface Notification {
  id: number;
  userName: string;
  avatarUrl?: string; // ✅ เพิ่มรูป user (optional)
  profile_pic?: string; // ✅ รูปจาก backend (optional)
  action: NotificationAction;
  articleTitle: string; // ✅ ชื่อบทความ
  message?: string;
  timeAgo?: string; // Fallback for backward compatibility
  created_at: string; // ✅ เพิ่ม timestamp สำหรับคำนวณเวลา (ตรงกับ backend)
  comment_content?: string; // ✅ เนื้อหาความ comment (สำหรับ notification type "comment")
  related_id?: number; // ✅ ID ของ article ที่เกี่ยวข้อง
  comment_id?: number; // ✅ ID ของ comment (ถ้ามี)
  article_id?: number; // ✅ ID ของ article (alternative field)
  is_read?: boolean; // ✅ สถานะการอ่าน
}
