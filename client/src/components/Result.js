import React from 'react'
import '../styles/Result.css'
import {Link} from 'react-router-dom';
import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';

import { resetAllAction } from '../redux/question_reducer';
import {resetResultAction} from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';


export default function Result() {

  const dispatch = useDispatch()
  const { questions : { queue, answers}, result : { result, userId}} = useSelector(state => state)

  const totalPoints = queue.length *10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10)
  const  flag = flagResult(totalPoints, earnPoints)

  
  usePublishResult({ 
    result, 
    username : userId, 
    attempts, 
    points: earnPoints, 
    achived : flag ? "Passed" : "Failed"
  })
 

  function onRestart(){
    dispatch(resetAllAction())
    dispatch(resetResultAction())
  }

  return (
    <>
    <div className='bg' >
    
    <div className='container'>
      <br></br>
      <h1 className='title text-light'> Result of Quiz Application </h1>

      <div className='result flex-center'>
        <div className='flex'>
          <span>Username</span>
          <span className='bold'>{userId}</span>
        </div>
        <div className='flex'>
          <span>Total Quiz Points : </span>
          <span className='bold'>{totalPoints || 0}</span>
        </div>
        <div className='flex'>
          <span>Total Questions : </span>
          <span className='bold'>{ queue.length || 0}</span>
        </div>
        <div className='flex'>
          <span>Total Attempts : </span>
          <span className='bold'>{attempts || 0}</span>
        </div>
        <div className='flex'>
          <span>Total Earn Points : </span>
          <span className='bold'>{earnPoints || 0}</span>
        </div>
        <div className='flex'>
          <span>Quiz Result</span>
          <span style ={{ color : flag ? "#3d7016" : "#77f312" }} className='bold'>{flag ? "Passed" : "Failed"}</span>
        </div>
      </div>
      <br></br>

      <div className="start">
        <Link className='btn' to={'/free'} onClick={onRestart}>Restart</Link>
      </div>
      <br></br>

      <div className=".container">
      <br></br>
      <h2 className='title text-light'> Result Sheet of the Quiz </h2>
        <ResultTable></ResultTable> 
      </div>

    </div>
    
    </div>
    </>
  )
}
