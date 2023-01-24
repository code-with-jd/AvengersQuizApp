import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { TextField } from "@mui/material";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [questionsDatabase, setQuestionsDatabase] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  async function ffetchDatabase() {
    const { data, error } = await supabase
      .from("QuestionsDatabase")
      .select("*");
    if (error) {
      console.log(error); // Bullit proofing - Check for errors
      return;
    }

    setQuestionsDatabase(data);
  }

  useEffect(() => {
    ffetchDatabase();
  }, []);

  return (
    <div>
      <header>
        <h1>Agents of Shield - Quiz</h1>
      </header>
      <body>
        <div class="menuContainer">
          <h3>Hauptmenü</h3>
          <TextField label="Name" required />
          <button>Bestätigen</button>
        </div>
        <div class="scoreConatiner">
          <h3>Bestenliste</h3>
        </div>

        <div>
          {questionsDatabase.length > 0 && (
            <div class="quizContainer">
              <h3>{questionsDatabase[0].question}</h3>
              {questionsDatabase[0].answers.map((answerOption) => {
                return (
                  <div key={answerOption.value}>
                    <button onClick={() => questionCheck()}>
                      {answerOption.value}
                    </button>
                  </div>
                );
              })}
              <h3>Score</h3>
            </div>
          )}
        </div>
      </body>
    </div>
  );
}
