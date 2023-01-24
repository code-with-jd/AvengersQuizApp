import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, Checkbox, TextField } from "@mui/material";

export default function Home() {
  const session = useSession();
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
      alert("Check your input fields");
    }
  }

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
    ffetchDatabase();
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

    ffetchDatabase();
  }

  return (
    <div>
      <header>
        <h1>Agents of Shield - Admin</h1>
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
          <Button className="submitButton" onClick={() => addNewRow()}>
            Submit question
          </Button>
        </div>
      </body>
    </div>
  );
}
