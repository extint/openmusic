import React from "react";
import "./login.css";
import vinylcd from './vinyl-cd.png'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export const Desktop1 = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // navigate('/home')
    let response;
    try {
      // Make API call to backend for login validation
      const response = await axios.post('http://localhost:8000/login', formData, { withCredentials: true });
      console.log(response);
      // Assuming the backend responds with a success message
      if (response.data.success) {
        // Redirect to the "/home" route
        const cd = document.querySelector('.vinylcd');
        cd.style.transform = 'translateX(+47%)';
        cd.style.transition = 'transform 900ms '
        setTimeout(() => {
          navigate(`/home/${formData.userName}`);
        }, 1300)
      } else {
        // Handle unsuccessful login (e.g., show an error message)
        console.log('Login failed');

      }
    } catch (error) {
      // Handle API call error
      console.error('Error during login:', error, response);
    }
  };
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const anchor = document.querySelector('.vinylcd');

    if (anchor) {
      const centerX = (anchor.getBoundingClientRect().left + anchor.getBoundingClientRect().right) / 2;
      const centerY = (anchor.getBoundingClientRect().left + anchor.getBoundingClientRect().right) / 2;
      const base = x - centerX;
      const height = centerY - y;
      const theta = -Math.atan2(height, base) * (180 / Math.PI);

      const rotatingcd = document.querySelector('.vinylcd');
      rotatingcd.style.transform = `rotate(${theta + 20}deg)`;
      console.log(theta);
    }

    document.removeEventListener('mousemove', handleSubmit);
  });
  const switchPage = () => {
    const cd = document.querySelector('.vinylcd');
    const blackBox = document.querySelector('.overlap-group');
    if (cd) {
      cd.style.transform = 'translateX(-55%)';
      cd.style.transition = 'transform 500ms ';
      cd.classList.add('transitioned');
      setTimeout(() => {
        cd.style.transform = 'translateX(0%)';
        cd.style.transition = 'transform 500ms';
      }, 800);
      setTimeout(() => {
        navigate('/signup');
      }, 1200);
      cd.onclick = null;
    }
  };


  return (
    <div className="desktop">
      <div className="div">
        <img className={`vinylcd`}
          alt="Vinyl cd" src={vinylcd} />
        <div className="overlap-group">
          {/* <div className="dynamic-name"></div> */}
          {/* ("#dynamic-name").circleType({radius: 800}); */}
          <div className="back-rect" />
          <div className="edge-rect-bl" />
          <div className="front-rect">
            <div className="lightbox"></div>
            <div className="lightbox-1"></div>
            <div className="lightbox-2"></div>
            <form type='submit' onSubmit={handleSubmit}>
              {/* <input className="name" name='name' value={name} onChange={handleName }></input> */}
              <input type="text" className="name" name="userName" value={formData.userName} onChange={handleInputChange} placeholder="Email"></input>
              <input type="password" className="name" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password"></input>
              {/* <input type="password" className="name"></input> */}

              <div style={{
                textDecoration: 'none',
                color: '#f39c12',  // Yellow color
                fontWeight: 'bold',
                fontSize: '18px',
                transition: 'color 0.3s',
                cursor: 'pointer',
                display: 'inline-block',
                marginRight: '10px',
              }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'} onClick={switchPage}>New User?</div>

              <button className="button">  CLICK ME !  </button>
            </form>
          </div>
          <div className="edge-rect-tr" />
          {/* <div className="button" /> */}
          {/* <div className="clickme"> </div> */}
          {/* <img className="shadow-horiz" alt="Shadow horiz" src="shadow-horiz.svg" /> */}
          <div className="signup">Log In</div>
          {/* <img className="shadow-vertical" alt="Shadow vertical" src="shadow-vertical.svg" /> */}
          <div className="screw" />
          <div className="screw-2" />
          <div className="screw-3" />
          <div className="screw-4" />
        </div>
        <div className="overlap">
          {/* <img className="navbar" alt="Navbar" src={navbar} /> */}
          <p className="myusik">MYUSIK</p>
        </div>
      </div>
    </div>

  );
}
