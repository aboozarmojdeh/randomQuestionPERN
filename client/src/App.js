import React,{Fragment,useState,useEffect} from 'react'

const App = () => {
  const [questions,setQuestions]=useState([]);

  useEffect(()=>{
    const questionGrabber=async ()=>{
      const response=await fetch('http://localhost:5000/questions');
      const questions=await response.json();
      console.log(questions)
      setQuestions(questions)
    }
    questionGrabber()
  },[])
  return (
    <div>
      hi
    </div>
  )
}

export default App
