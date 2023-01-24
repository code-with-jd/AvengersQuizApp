import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

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
        <div class="quiz">
          {questionsDatabase.length > 0 && (
            <div class="QuestionContainer">
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
            </div>
          )}
          <div class="score">
            <h3>Score</h3>
          </div>
        </div>
      </body>
    </div>
  );
}
