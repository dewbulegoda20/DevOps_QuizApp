import React from 'react';
import '../styles/App1.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Main from './free/Main';
import Quiz from './Quiz';
import Result from './Result';

import { CheckUserExist } from '../helper/helper';
import NotFound from '../NotFound'; 

const router = createBrowserRouter([
  {
    path: '/main',
    element: <Main />
  },
  {
    path: '/main/quiz',
    element: <CheckUserExist><Quiz /></CheckUserExist>
  },
  {
    path: '/main/result',
    element: <CheckUserExist><Result /></CheckUserExist>
  },

  {  path: "*" ,
    element: <NotFound /> 
  }

]);

function App1() {
  return (
    <>
    
     <RouterProvider router={router} />
    
    </>

  );
 }

export default App1;




