import { useEffect, useState, useContext } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AppContext } from "../pages/createContext";

export default function score(firstName, lastName, score) {
  const supabase = useSupabaseClient();
  const { currentAppState, setCurrentAppState } = useContext(AppContext);
  const [scoreboard, setScoreboard] = useState([]);
  const [scoreboardSorted, setScoreboardSorted] = useState([]);

  const handleRestartButtonClick = () => {
    // This will reset the quiz
    setCurrentAppState("quiz"); // This will change the currentAppState to "quiz"
  };

  useEffect(() => {
    setScoreboardSorted(
      scoreboard.sort((a, b) => b.playerScore - a.playerScore)
    );
  }, [scoreboard]);

  async function addUserScore() {
    const { data, error } = await supabase.from("Scoreboard").insert([
      {
        firstName: firstName,
        lastName: lastName,
        playerScore: score,
      },
    ]);
    if (error) {
      console.log(error); // Bullit proofing - Check for errors
      return;
    }
  }

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
    addUserScore();
  }, []);

  return (
    <div className="scoreConatiner">
      <p>
        <b>Bestenliste</b>
      </p>
      {scoreboard.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Platz</th>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Punkte</th>
            </tr>
          </thead>
          <tbody>
            {scoreboardSorted.map((scoreboardItem, index) => {
              if (index < 10) {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{scoreboardItem.firstName}</td>
                    <td>{scoreboardItem.lastName}</td>
                    <td>{scoreboardItem.playerScore}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      )}

      <button onClick={() => handleRestartButtonClick()}>Neustart</button>
    </div>
  );
}
