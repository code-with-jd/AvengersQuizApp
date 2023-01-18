import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [questionsDatabase, setQuestionsDatabase] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  console.log(session);

  async function fetchDatenbank() {
    const { data, error } = await supabase
      .from("QuestionsDatabase")
      .select("*");
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    setQuestionsDatabase(data);
  }

  useEffect(() => {
    fetchDatenbank();
  }, []);

  return (
    <div>
      {questionsDatabase.length > 0 && (
        <div>
          <h3>{questionsDatabase[4].question}</h3>
          {questionsDatabase[4].answers.map((answerOption) => {
            return (
              <div key={answerOption.value}>
                <p>{answerOption.value}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
