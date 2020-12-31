import React, { useState, useContext,useEffect } from "react";
import AnswerQuestion from '../apis/AnswerQuestion';

const QuestionForm = () => {
    // const { id } = useParams();
    // let history=useHistory();
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [randomQuestion,setRandomQuestion]=useState({});
  const [name, setName] = useState("");
const [labelSelected,SetLabelSelected]=useState("");


  useEffect(() => {
    const questionGrabber = async () => {
      const response = await AnswerQuestion.get("/");
    //   const questions = await response.json();
      console.log(response.data);
      setQuestions(response.data);
      SetLabelSelected(response.data[getRandomIntExclusive(0, response.data.length - 1)]
    .question_text);
    };
    questionGrabber();
    
    // let randomQuestionGenerator=questions[getRandomIntInclusive(0, questions.length - 1)];
    // console.log('randomQuestion',randomQuestion)
    // setRandomQuestion(randomQuestionGenerator)
  }, []);

  const nameChange = (event) => {
    setAnswer(event.target.value);
    console.log(event.target.value);
  };

//   const handleSubmitAnswer = async (e) => {
//     e.preventDefault();
   
//     const id=randomQuestion.question_id
//     const updateQuestion = await AnswerQuestion.put(`/${id}`, {
//         question_text:randomQuestion.question_text,
//         answer_text: answer
//     });
//     // history.push('/dashboard');
//   };

  const getRandomIntExclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };

  
  
  return (
    <div>
      <form>
        <div className="input-group mb-3">
          {questions.length ? (
            <label htmlFor="name">
              {
               labelSelected
              }
            </label>
          ) : (
            <div>Loading Question</div>
          )}
          <input
            value={answer}
            onChange={nameChange}
            id="name"
            className="form-control"
            type="text"
          />
        </div>
        <button
          type="submit"
        //   onClick={handleSubmitAnswer}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
