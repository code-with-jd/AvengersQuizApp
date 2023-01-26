import { useEffect, useState, useContext } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AppContext } from "../pages/createContext";

export default function score() {
  const supabase = useSupabaseClient();
  const { currentAppState, setCurrentAppState } = useContext(AppContext);
  const [scoreboard, setScoreboard] = useState(0);

  const handleRestartButtonClick = () => {
    // This will reset the quiz
    setCurrentAppState("quiz"); // This will change the currentAppState to "quiz"
  };

  async function fetchDatabase() {
    const { data, error } = await supabase.from("Scoreboard").select("*");
    if (error) {
      console.log(error); // Bullit proofing - Check for errors
      return;
    }

    setScoreboard(data);
  }

  useEffect(() => {
    fetchDatabase();
  }, []);

  return (
    <div className="scoreConatiner">
      <p>
        <b>Bestenliste</b>
      </p>
      {scoreboard.length > 0 && (
        <ol>
          {scoreboard.map((scoreboard) => (
            <li key={scoreboard.id}>
              {scoreboard.playerName} {scoreboard.playerScore}
            </li>
          ))}
        </ol>
      )}

      <button onClick={() => handleRestartButtonClick()}>Neustart</button>
    </div>
  );
}
