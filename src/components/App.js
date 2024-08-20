import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const addQuestion = (newQuestion) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then(response => response.json())
      .then(data => {
        setQuestions(prevQuestions => [...prevQuestions, data]);
        setShowForm(false);
      })
      .catch(error => console.error('Error adding question:', error));
  };

  const updateQuestion = (id, updatedData) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(data => {
        setQuestions(prevQuestions =>
          prevQuestions.map(question => 
            question.id === id ? { ...question, ...data } : question
          )
        );
      })
      .catch(error => console.error('Error updating question:', error));
  };

  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setQuestions(prevQuestions => 
          prevQuestions.filter(question => question.id !== id)
        );
      })
      .catch(error => console.error('Error deleting question:', error));
  };

  return (
    <main>
      <nav>
        <button onClick={() => setShowForm(false)}>View Questions</button>
        <button onClick={() => setShowForm(true)}>New Question</button>
      </nav>
      <section>
        <h1>Quiz Questions</h1>
        {showForm ? (
          <QuestionForm addQuestion={addQuestion} />
        ) : (
          <QuestionList 
            questions={questions} 
            deleteQuestion={deleteQuestion}
            updateQuestion={updateQuestion}
          />
        )}
      </section>
    </main>
  );
}

export default App;