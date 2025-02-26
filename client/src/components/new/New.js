
import React from "react";
import "../about/about.css";
import Back from "../common/back/Back"; 

import QuizForm from "./QuizForm";
import QuizList from "./QuizList";

const New = () => {
  return (
    <>
      <Back title='Create new ' />
      <QuizForm/>
      <QuizList/>
    </>
  );
};

export default New;
