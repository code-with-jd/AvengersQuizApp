import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const supabase = createClient(
  "https://jedlyvthmsxjzftsenqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplZGx5dnRobXN4anpmdHNlbnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM1MTY1ODEsImV4cCI6MTk4OTA5MjU4MX0.tvKxwvzVtEumgkT5GGUkXwkT32POLfS1eGYxnR3xHZo"
);

function Success() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        // value.data.user
        if (value.data?.user) {
          //aviod error of undifined.user
          setUser(value.date.user);
        }
      });
    }
    getUserData();
  }, []);

  //Function to sign out the user
  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Success</h1>
      </header>
      <body className="App-body">
        {Object.keys(user).length !== 0 ? (
          /* if user is logged in */
          <>
            <button onClick={() => signOutUser()}>Sign Out</button>
          </>
        ) : (
          /* if the user is not logged in */
          <>
            <h1>Access denied</h1>
            <h3>Your are not a logged in</h3>
            <button onClick={() => navigate("/")}>Retry</button>
          </>
        )}
      </body>
    </div>
  );
}

export default Success;
