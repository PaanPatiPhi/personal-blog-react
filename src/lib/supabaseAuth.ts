import { supabase } from './supabase';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  name: string;
}

export interface UserProfile {
  id: string;
  email: string;
  user_metadata: {
    username: string;
    name: string;
    role?: string;
  };
}

export const supabaseAuth = {
  // Login with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Register new user
  async signUp(email: string, password: string, username: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          name,
          role: 'user', // Default role
        },
      },
    });

    if (error) throw error;
    return data;
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    return user;
  },

  // Get current session
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    return session;
  },

  // Update user metadata (for role management)
  async updateUserMetadata(metadata: { role?: string; username?: string; name?: string }) {
    const { data, error } = await supabase.auth.updateUser({
      data: metadata,
    });

    if (error) throw error;
    return data;
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: import('@supabase/supabase-js').Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
