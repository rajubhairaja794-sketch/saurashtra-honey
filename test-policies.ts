import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
// We can't query pg_policies using the public anon key.
console.log("Can't query pg_policies without service role key.");
