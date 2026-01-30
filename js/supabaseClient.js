// js/supabaseClient.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://ucqxfreyypdwkiibgdvb.supabase.co";
const SUPABASE_ANON_KEY = "SUA_PUBLISHABLE_KEY_AQUI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
