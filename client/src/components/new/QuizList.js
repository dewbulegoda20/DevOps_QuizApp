import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './QuizList.css'; 

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    
    axios.get('http://localhost:5000/api/quizzes')
      .then(res => {
        setQuizzes(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load quizzes');
        setLoading(false);
      });
  }, []);

  // Show loading or error states
  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>{error}</p>;

  return (
    
    <div className="quiz-list-container">
    <div className="quiz-list">
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        quizzes.map((quiz) => (
          <div className="quiz-item" key={quiz._id}>
            <Link to={`/play-quiz/${quiz._id}`} className="quiz-link">
              <h3>{quiz.title}</h3>
              <p>{quiz.questions.length} Questions</p>
            </Link>
          </div>
        ))
      )}
    </div>
  </div>
  
  );
};

export default QuizList;
