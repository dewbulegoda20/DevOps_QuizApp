import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './Main.css'
import { setUserId } from '../../redux/result_reducer'


const Main = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const startQuiz = () => {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current.value));
    }
  };

  return (
    <>
      
      <div className='bg'>
        <div className='container1' align='center'>
        <br />
          <h1 className='titles'>Quiz Application for JavaScript</h1>
          <br />
          <br/>
          <div className='imgQuiz'>
          <img align='center' src="../images/JSQuiz.jpeg" alt='' style={{ maxWidth: '200px', maxHeight: '400px', width: '100%', height: 'auto' }}/>
          </div>
          <br />
          <br />
          
          
          <br /><br />

          <div id="userid">
            <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
          </div>
          <br />
          

          <div className='start'>
            <Link className='btn' to={'/main/quiz'} onClick={startQuiz}>Start Quiz</Link>
          </div>
          <br /><br /><br /><br /><br /><br /><br />
        </div>
      </div>
      
    </>
  );
}

export default Main;