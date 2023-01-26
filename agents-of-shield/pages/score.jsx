import { useEffect, useState, useContext } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AppContext } from "../pages/createContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function score() {
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Platz</TableCell>
              <TableCell>Vorname</TableCell>
              <TableCell>Nachname</TableCell>
              <TableCell>Punkte</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {scoreboardSorted.map((scoreboardItem, index) => {
              if (index < 10) {
                return (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{scoreboardItem.firstName}</TableCell>
                    <TableCell>{scoreboardItem.lastName}</TableCell>
                    <TableCell>{scoreboardItem.playerScore}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      )}

      <button onClick={() => handleRestartButtonClick()}>Neustart</button>
    </div>
  );
}
