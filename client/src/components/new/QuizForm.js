import React, { useState } from 'react';
import axios from 'axios';
import './QuizForm.css';

const QuizForm = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'questionText') {
      updatedQuestions[index].questionText = value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = value;
    } else {
      updatedQuestions[index].options[field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/quizzes', { title, questions })
      .then(res => {
        alert('Quiz Created');
        
        setTitle('');
        setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
      })
      .catch(err => alert('Error creating quiz'));
  };

  return (
    <div>
        <br/><br/>
      <h1 className='head' align="center">Create New Quiz</h1>
      <form onSubmit={handleSubmit} className='quizform'>
        <div>
          <label>Quiz Title: </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        {questions.map((q, index) => (
          <div key={index} className="question-block">
            <label>Question {index + 1}: </label>
            <input type="text" value={q.questionText} onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)} required />
            
            <label>Options:</label>
            {q.options.map((option, i) => (
              <input key={i} type="text" className="option" value={option} onChange={(e) => handleQuestionChange(index, i, e.target.value)} required />
            ))}
            
            <label>Correct Answer: </label>
            <input type="text" value={q.correctAnswer} onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)} required />
            
            {/* Delete Question Button */}
            <button type="delete-question-btn" className="delete-question-btn" onClick={() => deleteQuestion(index)}>Delete Question</button>
          </div>
        ))}
        
        <div className="add-question-btn">
          <button type="add-question-btn" onClick={addQuestion}>Add Question</button>
        </div>
        <button type="submit">Submit Quiz</button>
      </form>
      <br />
      <br />
    </div>
  );
};

export default QuizForm;
