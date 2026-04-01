import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Notification } from "../notifications/notification.types";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notifications');
      const notificationsData = response.data.data || [];
      console.log("Notifications API response:", response.data);
      console.log("Notifications data:", notificationsData);
      
      // Ensure notificationsData is an array
      const notificationsArray = Array.isArray(notificationsData) ? notificationsData : [];
      
      // Filter only unread notifications for dropdown
      const unreadNotifications = notificationsArray.filter((n: Notification) => !n.is_read);
      setNotifications(unreadNotifications);
      
      const unread = notificationsArray.filter((n: Notification) => !n.is_read).length || 0;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      
      // Remove from unread notifications (dropdown)
      setNotifications((prev: Notification[]) => 
        prev.filter((n: Notification) => n.id !== notificationId)
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      
      // Clear unread notifications (dropdown)
      setNotifications([]);
      
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
