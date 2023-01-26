import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { AppContext } from "../pages/createContext";

export default function Start() {
  const { currentAppState, setCurrentAppState } = useContext(AppContext);
  const [username, setUsername] = useState("");

  const handleStartButtonClick = () => {
    if (username === "") {
      alert("Bitte geben Sie Ihren Namen ein");
    } else {
      setCurrentAppState("quiz");
    }
  };

  return (
    <div className="startContainer">
      <p>Einstellungstest für neue Agenten</p>
      <p>
        Ihr Prüfer: <b>Phillip J. Coulson</b>{" "}
      </p>
      <TextField
        label="Vollständiger Name"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></TextField>

      <button onClick={() => handleStartButtonClick()}>Teilnehmen</button>
    </div>
  );
}
