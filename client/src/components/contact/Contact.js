import React from "react"
import Back from "../common/back/Back"
import "./contact.css"

const Contact = () => {
  
  return (
    <>
      <Back title='Contact us' />
      <section className='contactSection padding'>
        <div className='contactContainer shadow flexBetween'>
          <div className='contactLeft row'>
            <img src='./images/contact.jpg' alt='' />
          </div>
          <div className="contactRight">
            <h1>Contact us</h1>
            <p>We're open for any suggestion or just to have a chat</p>

            <div className="contactInfoGrid grid2">
              <div className="contactInfoBox">
                <h4>ADDRESS:</h4>
                <p>198, Main Street, Galle, Sri Lanka</p>
              </div>
              <div className="contactInfoBox">
                <h4>EMAIL:</h4>
                <p>quiz@gmail.com</p>
              </div>
              <div className="contactInfoBox">
                <h4>PHONE:</h4>
                <p>+9435 2355 198</p>
              </div>
            </div>

            <form action="">
              <div className="formRow flexBetween">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
              </div>
              <input type="text" placeholder="Subject" />
              <textarea placeholder="Create a message here..." cols="30" rows="10"></textarea>
              <button className="contactBtn">SEND MESSAGE</button>
            </form>

            <h3>Follow us here</h3>
            <span>FACEBOOK     TWITTER    INSTAGRAM    DRIBBBLE</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact;
