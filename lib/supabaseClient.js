import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The site is fully functional without Supabase configured — forms fall
// back to a mailto/WhatsApp link (see components/ContactForm.js) — so we
// avoid throwing at import time if the env vars aren't set yet. This lets
// the project run immediately after cloning, before a Supabase project has
// been wired up.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const isSupabaseConfigured = Boolean(supabase);
