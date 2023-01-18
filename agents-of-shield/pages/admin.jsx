import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Checkbox, TextField } from "@mui/material";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [newQuestionValue, setNewQuestionValue] = useState("");
  const [questionsDatabase, setQuestionsDatabase] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(4);
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
        console.log(error);
        return;
      }
      resetInputFields();

      console.log(data);
    } else {
      alert("Bitte fülle alle Felder aus");
    }
  }

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

  async function addAnswer() {
    console.log(questionsDatabase[currentQuestionIndex].answers);
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
      console.log(error);
      return;
    }
    console.log(data);
    setNewAnswerValue("");
    setNewAnswerCorrect(false);
    fetchDatenbank();
  }

  async function handleDeleteAnswer(answerValue) {
    console.log(answerValue);
    const { data, error } = await supabase
      .from("QuestionsDatabase")
      .update({
        answers: questionsDatabase[currentQuestionIndex].answers.filter(
          (answer) => answer.value !== answerValue
        ),
      })
      .eq("id", questionsDatabase[currentQuestionIndex].id);
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    fetchDatenbank();
  }

  return (
    <div>
      <div className="addQuestionContainer">
        <TextField
          label="Question"
          required
          value={newQuestionValue}
          onChange={(e) => setNewQuestionValue(e.target.value)}
        />

        {newAnswerOptions.map((answerOption, index) => {
          return (
            <div className="addAnswerContainer" key={index + "AnswerContainer"}>
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

        <input type="submit" onClick={() => addNewRow()} />
      </div>
    </div>
  );
}