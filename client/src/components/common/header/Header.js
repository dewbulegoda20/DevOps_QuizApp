import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";
import axios from "axios";

const Header = () => {
  const [click, setClick] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const profileIcon = "/images/profile1.png";
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedMobile, setUpdatedMobile] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [profilePicture, setProfilePicture] = useState(null);
  const [ setProfileIcon] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("loggedInUser");

    if (token && user) {
      setLoggedInUser(user);
    }
  }, []);

  const showMessageTemporarily = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", { email, password })
      .then((res) => {
        if (res.data.status === "Success") {
          // Save the JWT token and username to localStorage for persistent authentication
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("loggedInUser", res.data.username);

          // Show success message
          showMessageTemporarily("Login Successful!", "success");

          // Set the logged-in user in the state
          setLoggedInUser(res.data.username);

          // Hide login form (if necessary)
          setIsLoginVisible(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          showMessageTemporarily(err.response.data.error, "error");
        } else {
          showMessageTemporarily("An error occurred. Please try again.", "error");
        }
      });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/signup", { username, email, password })
      .then((res) => {
        if (res.data.status === "Success") {
          showMessageTemporarily("Sign-Up Successful!", "success");
          setLoggedInUser(username);
          setIsSignupVisible(false);
        }
      })
      .catch((err) => {
        showMessageTemporarily(err.response.data.error, "error");
      });
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/forgot-password", { email })
      .then((res) => {
        if (res.data.status === "Success") {
          showMessageTemporarily("Password reset email sent!", "success");
          setIsForgotPasswordVisible(false);
        }
      })
      .catch((err) => {
        showMessageTemporarily(err.response?.data?.error || "An error occurred", "error");
      });
  };

  const handleLogout = () => {
    // Clear the user authentication info from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedInUser");

    // Update the state
    setLoggedInUser(null);
    showMessageTemporarily("Logged out successfully!", "success");
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', updatedFirstName);
    formData.append('lastName', updatedLastName);
    formData.append('email', updatedEmail);
    formData.append('mobile', updatedMobile);
    formData.append('address', updatedAddress);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
  
    try {
      const response = await axios.put(`http://localhost:5000/api/profile/${username}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.user.profilePicture) {
        setProfileIcon(response.data.user.profilePicture);
      }
    } catch (err) {
      showMessageTemporarily(err.response.data.error || "An error occurred", "error");
    }
  };
  

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quizzes">All Quizzes</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/free">Free Quiz</Link></li>
            <li><Link to="/new">Create Quiz</Link></li>
          </ul>
          <div className="button-container">
            {loggedInUser ? (
              <>
                <span>Hi, {loggedInUser}</span>
                <li onClick={() => setIsProfileVisible(true)}>
                  <img src={profileIcon} alt="Profile Icon" style={{ width: '50px', height: '50px' }} />
                </li>
                <button className="btn btn-signin" onClick={handleLogout}>
                  <b>Logout</b>
                </button>
              </>
            ) : (
              <>
                <li onClick={() => setIsProfileVisible(true)}>
                  <img src={profileIcon} alt="Profile Icon" style={{ width: '50px', height: '50px' }} />
                </li>
                <button className="btn btn-signin" onClick={() => setIsLoginVisible(true)}>
                  <b>Sign In</b>
                </button>
              </>
            )}
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>

      {message && (
        <div className={`message ${messageType}`} onClick={() => setMessage('')}>
          {message}
        </div>
      )}

      {/* Login Form Popup */}
      {isLoginVisible && (
        <div className="login-container">
          <li className="close-btn" onClick={() => setIsLoginVisible(false)}>×</li>
          <div className="login-content">
            <form onSubmit={handleLoginSubmit}>
              <h2 align='center'>Login</h2>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  autoComplete="off"
                  name="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="show-password">
                  <input
                    type="checkbox"
                    checked={isPasswordVisible}
                    onChange={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                  <label>Show Password</label>
                </div>
              </div>
              <div className="forgot-password" onClick={() => setIsForgotPasswordVisible(true)}>
                <span>Forgot Password?</span>
              </div>
              <button type="submit" className="btn btn-signin w-100">Login</button>
              <div className="sign-up-link">
                <span>Don't have an account? </span>
                <span onClick={() => setIsSignupVisible(true)} style={{ color: 'blue', cursor: 'pointer' }}>Sign up</span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sign-Up Form Popup */}
      {isSignupVisible && (
        <div className="login-container">
          <li className="close-btn" onClick={() => setIsSignupVisible(false)}>×</li>
          <div className="login-content">
            <form onSubmit={handleSignupSubmit}>
              <h2 align='center'>Sign Up</h2>
              <div className="mb-3">
                <label htmlFor="name"><strong>Name</strong></label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  autoComplete="off"
                  name="name"
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input
                  type="password" 
                  placeholder="Enter Password"
                  autoComplete="off"
                  name="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-secondary w-100">Sign Up</button>
            </form>
          </div>
        </div>
      )}

      {/* Forgot Password Popup */}
      {isForgotPasswordVisible && (
        <div className="login-container">
          <li className="close-btn" onClick={() => setIsForgotPasswordVisible(false)}>×</li>
          <div className="login-content">
            <form onSubmit={handleForgotPasswordSubmit}>
              <h2 align='center'>Forgot Password</h2>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-secondary w-100">Send Reset Link</button>
            </form>
          </div>
        </div>
      )}

      {/* Profile Popup */}

      {isProfileVisible && (
        <div className="profile-login-container">
          <li className="close-btn" onClick={() => setIsProfileVisible(false)}>×</li>
          <div className="profile-login-content">
            <h2 align='center'>Profile</h2>
           
            <form onSubmit={handleProfileUpdate}>
            <li align='center'>
          <input
            type="file"
            id="profilePicture"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
          <img
            src={profileIcon ? profileIcon : 'default-profile-icon.png'}
            alt="Profile Icon"
            style={{ width: '80px', height: '80px', cursor: 'pointer' }}
            onClick={() => document.getElementById('profilePicture').click()}
          />
        </li>
            <br />
            <div className="row">
              <div className="mb-3">
                <label htmlFor="firstName"><strong>First Name</strong></label>
                <input
                  type="text"
                  value={updatedFirstName}
                  onChange={(e) => setUpdatedFirstName(e.target.value)}
                  className="form-control1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName"><strong>Last Name</strong></label>
                <input
                  type="text"
                  value={updatedLastName}
                  onChange={(e) => setUpdatedLastName(e.target.value)}
                  className="form-control1"
                />
              </div>
              </div>

              <div className="row">
              <div className="mb-3">
                <label htmlFor="mobile"><strong>Mobile No.</strong></label>
                <input
                  type="text"
                  value={updatedMobile} 
                  onChange={(e) => setUpdatedMobile(e.target.value)} 
                  className="form-control1"
                />
              </div>

              <div className="mb-3">
              <label htmlFor="address"><strong>Address</strong></label>
              <input
                type="text"
                value={updatedAddress} 
                onChange={(e) => setUpdatedAddress(e.target.value)}
                className="form-control1"
                
              />
              </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-secondary w-100">Update Profile</button>
              </form>
              
            </div>
          </div>
      )}


    </>
  );
};

export default Header;
