import React, { useState } from 'react'
import Questions from './Questions'

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';

import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import '../styles/App1.css'


export default function Quiz() {

  const [check, setChecked] = useState(undefined)

  const result  = useSelector(state => state.result.result);
  const { queue, trace }  = useSelector(state => state.questions);
  const dispatch = useDispatch()



  
  function onNext(){
    console.log('On next click')

    if(trace < queue.length){
      
      dispatch(MoveNextQuestion());

      if (result.length <= trace){
        dispatch(PushAnswer(check))
      }
    } 

    
    setChecked(undefined)
    
    
  }
  
  
  function onPrev(){
    if (trace > 0){
      
      dispatch(MovePrevQuestion());

    }
  }
  function onChecked(check){
    console.log(check)
    setChecked(check)
  }

  
  if(result.length && result.length >= queue.length){
    return <Navigate to={'/main/result'} replace="true"></Navigate>
  }

  return (
    <>
    <section className='quiz'>
    
    <div className='container1'>
      <br></br>
      <h1 className="text-light" style={{ textAlign: 'center', fontSize: '40px' }}>
        Quiz Application for JavaScript
      </h1>

      <Questions onChecked={onChecked} />
      
      <div className='grid'>
        { trace > 0 ? <button className='btn prev'onClick={onPrev} >Prev</button> : <div></div>}
        <button className='btn next' onClick={onNext} >Next</button>
      </div>
      <br></br>
      <br></br>
    </div>
    </section>

    </>
  )
}
