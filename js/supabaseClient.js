// js/supabaseClient.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Substitua pelo seu Project URL e Publishable Key
const SUPABASE_URL = "https://ucqxfreyypdwkiibgdvb.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_9hETD38TstyiNqwpa63Myg_0ZKCH0wF";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
