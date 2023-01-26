import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { AppContext } from "../pages/createContext";

export default function Start({
  firstName,
  setFirstName,
  lastName,
  setLastName,
}) {
  const { currentAppState, setCurrentAppState } = useContext(AppContext);

  const handleStartButtonClick = () => {
    if (firstName === "") {
      alert("Bitte geben Sie Ihren Vornamen ein");
      return;
    }
    if (lastName === "") {
      alert("Bitte geben Sie Ihren Nachnamen ein");
      return;
    }
    setCurrentAppState("quiz"); // This will set the currentAppState to "quiz"
  };

  return (
    <div className="startContainer">
      <p>Einstellungstest für neue Agenten</p>
      <p>
        Ihr Prüfer: <b>Phillip J. Coulson</b>{" "}
      </p>
      <TextField
        label="Vorname"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      ></TextField>
      <TextField
        label="Nachname"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      ></TextField>

      <button onClick={() => handleStartButtonClick()}>Teilnehmen</button>
    </div>
  );
}
