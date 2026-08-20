import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const supabaseAnon = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

// Get a token to act as an admin user. I don't have one, but I can use service role to get a user and their token... wait, I don't have the user token!
