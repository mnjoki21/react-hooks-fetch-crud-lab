import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";



function QuestionList() {
  const [ questions , setQuestions ] = useState([])

  useEffect (()=> {
    fetch ('  http://localhost:4000/questions')
    .then ((r) => r.json())
    .then ((questions) => {
      setQuestions(questions)
    });
  }, [])

  function handleDeleteClick(id) {
    fetch (`http://localhost:4000/questions/${id}`, {
      method : "DELETE"
    })
    .then ((r) => r.json())
    .then (() => {
      const updatedQuestions =questions.filter((q) =>q.id !== id)
      setQuestions(updatedQuestions)
    })
    
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers : {
        "Content-Type" : "application/json",

      },
      body : JSON.stringify({ correctIndex }),
    })
    .then ((r) => r.json())
    .then((updatedQuestion) => {
      const updatedQuestion = questions.map((q) => {
        if (q.id === updatedQuestion.id) return updatedQuestion; 
        return q})
    });
    setQuestions(updatedQuestions) 
  }

  const questionitems = questions.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ))


 return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
