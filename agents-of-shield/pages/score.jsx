import { useEffect, useState, useContext } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AppContext } from "../pages/createContext";
import { List, ListItem } from "@mui/material";

export default function score() {
  const supabase = useSupabaseClient();
  const { currentAppState, setCurrentAppState } = useContext(AppContext);
  const [scoreboard, setScoreboard] = useState(0);

  const handleRestartButtonClick = () => {
    // This will reset the quiz
    setCurrentAppState("quiz"); // This will change the currentAppState to "quiz"
    setScore(0); // This will reset the score to 0
    setQuestionCounter(1); // This will reset the questionCounter to 1
    setShowScore(false); // This will reset the showScore to false
  };

  async function ffetchDatabase() {
    const { data, error } = await supabase.from("Scoreboard").select("*");
    if (error) {
      console.log(error); // Bullit proofing - Check for errors
      return;
    }

    setScoreboard(data);
  }

  useEffect(() => {
    ffetchDatabase();
  }, []);

  return (
    <div className="scoreConatiner">
      {scoreboard.length > 0 && (
        <div>
          <p>{scoreboard[0].playerName}</p>
        </div>
      )}

      <button onClick={() => handleRestartButtonClick()}>Neustart</button>
    </div>
  );
}
