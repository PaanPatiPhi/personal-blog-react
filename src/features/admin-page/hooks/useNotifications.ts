import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export type Notification = {
  id: string;
  recipient_id: string;
  sender_id: string;
  type: 'comment' | 'like';
  message: string;
  related_id?: string;
  is_read: boolean;
  created_at: string;
  read_at?: string;
  username?: string;
  profile_pic?: string;
  article_title?: string;
  comment_content?: string;
};

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notifications');
      const notificationsData = response.data.data || [];
      console.log(response)
      
      // Ensure notificationsData is an array
      const notificationsArray = Array.isArray(notificationsData) ? notificationsData : [];
      
      setNotifications(notificationsArray);
      
      const unread = notificationsArray.filter((n: Notification) => !n.is_read).length || 0;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    loading,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead
  };
}
