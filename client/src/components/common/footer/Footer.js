import React from "react"

import "./footer.css"

const Footer = () => {
  return (
    <>
      
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>QuizPulse</h1>
            <span>ONLINE QUIZZES & COURSES</span>
            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Courses</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Pricing</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div>
          
          <div className='box last'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                198, Main Street, Galle, Sri Lanka
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                + 9435 2355 198
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                quiz@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2022 All rights reserved | www.online_quiz_application.com
        </p>
      </div>
    </>
  )
}

export default Footer
