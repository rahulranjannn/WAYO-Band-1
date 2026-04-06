import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Warning: Supabase environment variables are missing! createClient may fail or queries will be unauthorized.');
}

// Fallback handles Vite crash locally if the config was forgotten
export const supabase = createClient(
  supabaseUrl || 'https://fallback-url.supabase.co',
  supabaseAnonKey || 'fallback-key'
);
