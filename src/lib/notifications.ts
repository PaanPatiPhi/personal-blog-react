import { api } from "./api";
import { supabase } from "./supabase";

export async function createNotification(data: {
  type: 'comment' | 'like';
  message: string;
  post_id?: string;
  user_id?: string;
  comment_id?: number;
}) {
  try {
    // Get current user for sender_id
    const { data: { session } } = await supabase.auth.getSession();
    
    // TODO: Get actual post owner ID from the post
    // For now, send to current user (you should fetch post owner from database)
    const recipientId = session?.user?.id; // This should be post owner's ID
    
    const notificationData: any = {
      recipient_id: recipientId,
      sender_id: session?.user?.id,
      type: data.type,
      message: data.message,
    };
    
    // Add appropriate ID based on type
    if (data.type === 'comment' && data.comment_id) {
      notificationData.comment_id = data.comment_id;
    } else if (data.type === 'like' && data.post_id) {
      notificationData.related_id = data.post_id;
    }
    
    console.log("Sending notification to API:", notificationData);
    
    await api.post('/notifications', notificationData);
    console.log("Notification created successfully");
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}

export async function notifyNewComment(postId: string, _postTitle: string, userName: string, commentId?: number) {
  console.log("Creating notification for comment:", { postId, userName, commentId });
  await createNotification({
    type: 'comment',
    message: `${userName} commented on your post`,
    post_id: postId,
    comment_id: commentId,
  });
}

export async function notifyNewLike(postId: string, _postTitle: string, userName: string) {
  console.log("Creating notification for like:", { postId, userName });
  await createNotification({
    type: 'like',
    message: `${userName} liked your post`,
    post_id: postId,
  });
}
