import "@/styles/globals.css";
import {
  SessionContextProvider,
  SupabaseClient,
} from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";

export default function App({ Component, pageProps }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      intialSession={pageProps.initailSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
