import React, { useState } from "react";
import AnswerQuestion from "../apis/AnswerQuestion";
// import ShowForm from './ShowForm';
const QuestionForm = () => {
  // const { id } = useParams();
  // let history=useHistory();
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [labelSelected, SetLabelSelected] = useState("");
  const [idSelected, SetIdSelected] = useState("");

  const [isShowForm, setIsShowForm] = useState(false);
  const [disableAskMe,setDisableAskMe]=useState(false);
  const [askMeAlert,setAskMeAlert]=useState('Ask Me');

  // useEffect(() => {

  // }, []);

  const nameChange = (event) => {
    setAnswer(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();

    const updateQuestion = await AnswerQuestion.put(`/${idSelected}`, {
      question_text: labelSelected,
      answer_text: answer,
      is_answered: true,
    });
    // history.push('/dashboard');
    setAnswer("");
    setIsShowForm(false);
  };

  const getRandomIntExclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };

  const handleAskMe = () => {
    const questionGrabber = async () => {
      const response = await AnswerQuestion.get("/unanswered");
      //   const questions = await response.json();
      if (response.data.length) {
        console.log("questions", response.data);
        setQuestions(response.data);
        let randomNumber = getRandomIntExclusive(0, response.data.length - 1);
        console.log("randomNumber", randomNumber);
        SetLabelSelected(response.data[randomNumber].question_text);
        SetIdSelected(response.data[randomNumber].question_id);
        console.log("id", response.data[randomNumber].question_id);
        setIsShowForm(true);
        setAskMeAlert('Ask Me')
      } else {
        // SetLabelSelected();
        setAskMeAlert('No question rigth now! try again later')
        setDisableAskMe(true)
      }
    };
    questionGrabber();

    
  };

  return (
    <div className="container my-3">
      <button
      id='ask-me'
        type="button"
        className="btn btn-primary"
        onClick={() => handleAskMe()}
        // disabled={disableAskMe}
      >
        {askMeAlert}
      </button>
      {isShowForm ? (
        <form id="add-app">
          <div className="input-group mb-3">
            {questions.length ? (
              <label htmlFor="name">{labelSelected}</label>
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
            onClick={handleSubmitAnswer}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default QuestionForm;
