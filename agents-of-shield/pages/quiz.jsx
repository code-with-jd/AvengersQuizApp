import { useEffect, useState, useContext } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AppContext } from "../pages/createContext";

/* function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} */

export default function Quiz() {
  const supabase = useSupabaseClient();

  const [questionsDatabase, setQuestionsDatabase] = useState(0);

  /* Make sure questions will never be the same */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    Math.floor(Math.random() * 3)
  );

  const [questionCounter, setQuestionCounter] = useState(
    1 /* User defined Value */
  );

  const [score, setScore] = useState(0);

  const { currentAppState, setCurrentAppState } = useContext(AppContext);

  /* Adds 1 to the score if the answer is correct */
  const handleAnwserButtonClick = (correct) => {
    if (correct === true) {
      setScore(score + 1);
    }

    //This will increment the currentQuestionIndex by a random number
    setCurrentQuestionIndex(
      currentQuestionIndex + 1 + Math.floor(Math.random() * 4)
    );

    //This is to check how many questions have been answered
    setQuestionCounter(questionCounter + 1);

    //Anytime the currentQuestionIndex is equal to the length of the questionsDatabase array, we want to reset the currentQuestionIndex to 0
    if (currentQuestionIndex === questionsDatabase.length - 1) {
      setCurrentQuestionIndex(0);
    }

    if (questionCounter === 12) {
      alert("Du hast " + score + " von 12 Fragen richtig beantwortet");
      setCurrentAppState("score");
    }
  };

  async function fetchDatabase() {
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
    fetchDatabase();
  }, []);

  return (
    <div>
      <div>
        {questionsDatabase.length > 0 && (
          <div className="quizContainer">
            <p>Frage {questionCounter} von 12</p>
            <h3>{questionsDatabase[currentQuestionIndex].question}</h3>
            {questionsDatabase[currentQuestionIndex].answers.map(
              (answerOption) => {
                return (
                  <div key={answerOption.value}>
                    <button
                      onClick={() =>
                        handleAnwserButtonClick(answerOption.correct)
                      }
                    >
                      {answerOption.value}
                    </button>
                  </div>
                );
              }
            )}
            <p>{score} von 12</p>
          </div>
        )}
      </div>
    </div>
  );
}
