import React from 'react';

function QuestionList({ questions, deleteQuestion, updateQuestion }) {
  return (
    <ul>
      {questions.map(question => (
        <li key={question.id}>
          <p>{question.prompt}</p>
          <label>
            Correct Answer:
            <select 
              value={question.correctIndex}
              onChange={(e) => updateQuestion(question.id, { correctIndex: parseInt(e.target.value, 10) })}
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
          </label>
          <button onClick={() => deleteQuestion(question.id)}>Delete Question</button>
        </li>
      ))}
    </ul>
  );
}

export default QuestionList;