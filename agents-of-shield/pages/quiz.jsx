import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/* function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} */

export default function Quiz() {
  const supabase = useSupabaseClient();
  const [questionsDatabase, setQuestionsDatabase] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const questionCheck = () => {
    //This will increment the currentQuestionIndex by 1
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    //This is to check how many questions have been answered
    setQuestionCounter(questionCounter + 1);
    //Anytime the currentQuestionIndex is equal to the length of the questionsDatabase array, we want to reset the currentQuestionIndex to 0
    if (currentQuestionIndex === questionsDatabase.length - 1) {
      setCurrentQuestionIndex(0);
    }
    if (questionCounter === questionsDatabase.length) {
      showScore(true);
    }
  };

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
      {/* Score that will be displayed at the end of the quiz */}
      {showScore ? (
        setCurrentAppState("quiz")
      ) : (
        /* If it is not the specified end, questions are asked */
        <body>
          <div>
            {questionsDatabase.length > 0 && (
              <div class="quizContainer">
                <h3>{questionsDatabase[currentQuestionIndex].question}</h3>
                {questionsDatabase[currentQuestionIndex].answers.map(
                  (answerOption) => {
                    return (
                      <div key={answerOption.value}>
                        <button onClick={() => questionCheck()}>
                          {answerOption.value}
                        </button>
                      </div>
                    );
                  }
                )}
                <h3>Score</h3>
              </div>
            )}
          </div>
        </body>
      )}
      ;
    </div>
  );
}
