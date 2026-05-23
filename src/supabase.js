import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eotwicgwjylxeihgmsti.supabase.co";

const supabaseAnonKey =
  "sb_publishable_cOzHl8iaTcMT19zwnso1Mg_xY9ruYA6";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);