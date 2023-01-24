import { useEffect, useState, useContext } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AppContext } from "../pages/createContext";

export default function score() {
  return (
    <div className="startContainer">
      <p>
        Ihr Prüfer: <b>Phillip J. Coulson</b>{" "}
      </p>

      {/*       <TextField
        label="Anzahl der Fragen"
        required
        value={numberOfQuestions}
      ></TextField> */}

      <button onClick={() => setCurrentAppState("quiz")}>Teilnehmen</button>
    </div>
  );
}
