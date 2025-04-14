import { createBrowserClient } from "@supabase/ssr";
import { Database } from './types';


// Get these from your Supabase project settings > API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
  throw ('Missing Supabase environment variables. Check your .env.local file.');
  }
  return createBrowserClient<Database>(supabaseUrl,supabaseKey);
}

export const supabaseClient = createClient();