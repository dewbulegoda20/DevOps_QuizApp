import React from "react";
//import { Link } from 'react-router-dom';
import Heading from "../../common/heading/Heading";
import "./Hero.css";


const Hero = () => {
  
 

  return (
    <>
      <section className='hero' >
        <div className='container'>
          <div className='row1'>
            <Heading subtitle='WELCOME TO QuizPulse' title='Best Online Quiz Expertise' />
            <p>Far, far away, beyond the vast horizons of knowledge, </p>
              <p>in a realm untouched by time and space, 
              there exists a quiz application. </p><p>Hidden from the ordinary eye, 
              it beckons to those who seek to challenge</p><p> their minds and uncover hidden truths.</p>
            <div className='button'>
              <button className='primary-btn'>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              
              <button >   
              VIEW QUIZZES<i className='fa fa-long-arrow-alt-right'></i>
              </button>
              
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  );
};

export default Hero;
