import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/App1.css';
import '../new/PlayQuiz.css' ;


const PlayQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quizzes/${id}`)
      .then(res => {
        setQuiz(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load quiz');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz) return <p>No quiz found.</p>;

  const currentQuestion = quiz.questions?.[currentQuestionIndex];

  if (!currentQuestion) return <p>No questions available.</p>;

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    const isCorrect = Array.isArray(currentQuestion.correctAnswer) 
      ? currentQuestion.correctAnswer.includes(answers[currentQuestionIndex])
      : currentQuestion.correctAnswer === answers[currentQuestionIndex];

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="container1">
      {!quizFinished ? (
        <>
          <br />
          <h1 className="text-light" style={{ textAlign: 'center' }}>{quiz.title}</h1>
          <div className="questions">
            <h2 className="text-light">{currentQuestion.questionText}</h2>
            <ul>
              {currentQuestion.options?.map((answer, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    id={`answer-${index}`}
                    name="quizAnswer"
                    value={answer}
                    checked={answers[currentQuestionIndex] === answer}
                    onChange={() => handleAnswerSelect(answer)} 
                  />
                  <label htmlFor={`answer-${index}`}>
                    <span className={`check ${answers[currentQuestionIndex] === answer ? 'checked' : ''}`}></span>
                    {answer}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="button-container">
          {currentQuestionIndex > 0 && ( 
            <button className='btn prev' onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
              Prev
            </button>
          )}
          <button className="btn next"  onClick={handleNextQuestion} disabled={answers[currentQuestionIndex] === undefined}>
            Next
          </button>
          
          </div>
          <div className="back-button-container">
            <Link className="btn prev" to="/quizlist">
              Back to Quiz List
            </Link>
          </div>


          <br /><br /><br />
        </>
      ) : (
        <div className="results">
        <br></br>
        <h1 className="title ">Quiz Finished!</h1>
      
        <div className='result flex-center'>
          <div className='flex'>
            <span>Total Quiz Points: </span>
            <span className='bold'>{quiz.questions.length * 10 || 0}</span>
          </div>
          <div className='flex'>
            <span>Total Questions: </span>
            <span className='bold'>{quiz.questions.length || 0}</span>
          </div>
          <div className='flex'>
            <span>Total Earned Points: </span>
            <span className='bold'>{score*10 || 0}</span>
          </div>
          <div className='flex'>
            <span>Quiz Result: </span>
            <span style={{ color: score >= (quiz.questions.length * 5) ? "#3d7016" : "#77f312" }} className='bold'>
              {score >= (quiz.questions.length * 5) ? "Passed" : "Failed"}
            </span>
          </div>
        </div>
        
        <br></br>
        <div className="start">
          <Link className="btn prev" to="/quizlist">Back to Quiz List</Link>
        </div>
        <br></br>
      </div>
      
      )}
    </div>
  );
};

export default PlayQuiz;
