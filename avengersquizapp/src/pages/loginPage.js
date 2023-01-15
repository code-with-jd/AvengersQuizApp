import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://jedlyvthmsxjzftsenqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZGx5dnRobXN4anpmdHNlbnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM1MTY1ODEsImV4cCI6MTk4OTA5MjU4MX0.tvKxwvzVtEumgkT5GGUkXwkT32POLfS1eGYxnR3xHZo"
);

function Login() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      // Redirect to the success page
      navigate("/success");
    } else {
      // Redirect to the login page
      navigate("/");
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
      </header>
      <body className="App-body">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      </body>
    </div>
  );
}

export default Login;
