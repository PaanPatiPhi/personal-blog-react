import { supabaseAuth } from './supabaseAuth';

/**
 * Utility function to set a user as admin
 * This should be called manually for initial admin setup
 */
export async function setUserAsAdmin(email: string): Promise<void> {
  try {
    // First, get the current user (should be logged in as the user you want to make admin)
    const user = await supabaseAuth.getCurrentUser();
    
    if (!user) {
      throw new Error('No user logged in');
    }

    if (user.email !== email) {
      throw new Error('Logged in user email does not match the provided email');
    }

    // Update user metadata to set role as admin
    await supabaseAuth.updateUserMetadata({
      role: 'admin'
    });

  } catch (error) {
    console.error('Error setting user as admin:', error);
    throw error;
  }
}

/**
 * Check if the current user is an admin
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  try {
    const user = await supabaseAuth.getCurrentUser();
    if (!user) return false;
    
    const metadata = user.user_metadata as { role?: string };
    return metadata.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}
