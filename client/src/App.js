import "./App.css";
import './styles/App1.css';

import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";

import Main from './components/free/Main';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { CheckUserExist } from './helper/helper';

import New from './components/new/New';
import Free from './components/free/Free';

import QuizForm from './components/new/QuizForm';
import QuizList from './components/new/QuizList';
import PlayQuiz from './components/new/PlayQuiz';

function App() {
  return (
    
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/quizzes" element={<CourseHome />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/main" element={<Main />} />
          <Route path="/main/quiz" element={<CheckUserExist><Quiz /></CheckUserExist>} />
          <Route path="/main/result" element={<CheckUserExist><Result /></CheckUserExist>} />
          <Route path="/new" element={<New />} />
          <Route path="/free" element={<Free />} />
          <Route path="/quizform" element={<QuizForm />} />
          <Route path="/quizlist" element={<QuizList />} />
          <Route path="/play-quiz/:id" element={<PlayQuiz />} />
          
        </Routes>
        <Footer />
      </Router>
    
  );
}

export default App;
