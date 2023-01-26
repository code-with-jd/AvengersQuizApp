import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Checkbox, TextField } from "@mui/material";

export default function Home() {
  const supabase = useSupabaseClient();
  const [newQuestionValue, setNewQuestionValue] = useState("");
  const [questionsDatabase, setQuestionsDatabase] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState();
  const [newAnswerOptions, setNewAnswerOptions] = useState([
    { value: "", correct: false },
    { value: "", correct: false },
    { value: "", correct: false },
    { value: "", correct: false },
  ]);

  function resetInputFields() {
    setNewQuestionValue("");
    setNewAnswerOptions([
      { value: "", correct: false },
      { value: "", correct: false },
      { value: "", correct: false },
      { value: "", correct: false },
    ]);
  }

  async function addNewRow() {
    let errorState = false;
    if (newQuestionValue === "" || newQuestionValue === undefined) {
      errorState = true;
    }
    newAnswerOptions.forEach((answerOption) => {
      if (answerOption.value === "" || answerOption.value === undefined) {
        errorState = true;
      }
    });
    if (!errorState) {
      const { data, error } = await supabase.from("QuestionsDatabase").insert([
        {
          question: newQuestionValue,
          answers: newAnswerOptions,
        },
      ]);
      if (error) {
        console.log(error); // Bullit proofing - Check for errors
        return;
      }
      resetInputFields();
    } else {
      alert("Überprüfe deine Eingaben");
    }
  }

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

  async function addAnswer() {
    if (newAnswerValue === "" || newAnswerValue === undefined) {
      alert("Bitte gib einen Wert ein");
      return;
    }
    const { data, error } = await supabase
      .from("QuestionsDatabase")
      .update({
        answers: questionsDatabase[currentQuestionIndex].answers.concat({
          value: newAnswerValue,
          correct: newAnswerCorrect,
        }),
      })
      .eq("id", questionsDatabase[currentQuestionIndex].id);
    if (error) {
      console.log(error); // Bullit proofing - Check for errors
      return;
    }

    setNewAnswerValue("");
    setNewAnswerCorrect(false);
    fetchDatabase();
  }

  async function handleDeleteAnswer(answerValue) {
    const { data, error } = await supabase
      .from("QuestionsDatabase")
      .update({
        answers: questionsDatabase[currentQuestionIndex].answers.filter(
          (answer) => answer.value !== answerValue
        ),
      })
      .eq("id", questionsDatabase[currentQuestionIndex].id);
    if (error) {
      console.log(error); // Bullit proofing - Check for errors
      return;
    }

    fetchDatabase();
  }

  return (
    <>
      <header>
        <img className="AgencyLogo" />
        <h1>AGENTS OF SHIELD</h1>
        <div className="LoginButton"></div>
      </header>
      <body>
        <div className="addTableRowContainer">
          <TextField
            label="Question"
            required
            value={newQuestionValue}
            onChange={(e) => setNewQuestionValue(e.target.value)}
          />

          {newAnswerOptions.map((answerOption, index) => {
            return (
              <div
                className="addAnswerContainer"
                key={index + "AnswerContainer"}
              >
                <TextField
                  label={"Answer " + (index + 1)} // 1, 2, 3, 4
                  required
                  value={answerOption.value}
                  onChange={(e) => {
                    const newAnswerOptionsCopy = [...newAnswerOptions];
                    newAnswerOptionsCopy[index].value = e.target.value;
                    setNewAnswerOptions(newAnswerOptionsCopy);
                  }}
                />
                <Checkbox // Checkbox for correct answer
                  onChange={(e) => {
                    const newAnswerOptionsCopy = [...newAnswerOptions];
                    newAnswerOptionsCopy[index].correct = e.target.checked;
                    setNewAnswerOptions(newAnswerOptionsCopy);
                  }}
                />
              </div>
            );
          })}
          <button onClick={() => addNewRow()}>Submit question</button>
        </div>
      </body>
    </>
  );
}
