import React, { useState, useContext } from "react";
import Start from "../pages/start";
import Quiz from "../pages/quiz";
import Score from "../pages/score";
import { AppContext } from "../pages/createContext";

export default function AppNavContainer() {
  const [currentAppState, setCurrentAppState] = useState("start");

  return (
    <div>
      <header>
        <h1>AGENTS OF SHIELD</h1>
      </header>

      {/* Navigate between pages, to keep code uncluttered  */}
      <AppContext.Provider value={{ currentAppState, setCurrentAppState }}>
        {currentAppState === "start" && <Start />}
        {currentAppState === "quiz" && <Quiz />}
        {currentAppState === "score" && <Score />}
      </AppContext.Provider>
    </div>
  );
}
