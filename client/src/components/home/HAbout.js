import React from "react";
import Heading from "../common/heading/Heading"; 
import "../allcourses/courses.css";
import QuizList from "../new/QuizList";

const HAbout = () => {
  return (
    <>
      <section className='homeAbout'>
        <div className='container'>
          <Heading subtitle='our quizzes' title='explore our popular online quizzes' />

          <QuizList/>
        </div>
        
      </section>
    </>
  );
};

export default HAbout;
