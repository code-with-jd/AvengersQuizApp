import { TextField } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../pages/createContext";

export default function Start() {
  const { currentAppState, setCurrentAppState } = useContext(AppContext);
  const numberOfQuestions = "";

  return (
    <div className="startContainer">
      <p>
        Ihr Prüfer: <b>Phillip J. Coulson</b>{" "}
      </p>
      <TextField label="Vollständiger Name" required></TextField>
      {/*       <TextField
        label="Anzahl der Fragen"
        required
        value={numberOfQuestions}
      ></TextField> */}

      <button onClick={() => setCurrentAppState("quiz")}>Teilnehmen</button>
    </div>
  );
}
