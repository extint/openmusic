import React from "react";
import "./style.css";
import vinylcd from './vinyl-cd.png'
import { Link , useNavigate} from "react-router-dom";
import navbar from './navbar.png'
import { useState } from "react";
import axios from 'axios';

export const Desktop = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        conf_password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    };
      const navigate = useNavigate();
      const handleSubmit= async (e)=>{
        e.preventDefault()
        let response;
        console.log(formData.name)
        console.log(formData.email)
        console.log(formData.password)
        console.log(formData.conf_password)
        if(formData.password !== formData.conf_password){
            console.error("passwords do not match");
            return;
        }
        const form = {
            userName: formData.name,
            password: formData.password,
            emailId: formData.email
        }
        try{
            const response  = await axios.post('http://localhost:8000/signup', form, {withCredentials: true});
            console.log(response);
            if(response.data.success){
                const cd = document.querySelector('.vinylcd');
                cd.style.transform = 'translateX(+47%)';
                cd.style.transition = 'transform 900ms '
                setTimeout(()=>{
                navigate(`/home/${formData.name}`); 
                },1300)
            }
            else {
                console.log('Signup failed');
            }
        }
        catch (error) {
            console.error('Error during login', error, response);
        }
    };
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        const anchor = document.getElementsByClassName('.vinylcd');

        if (anchor) {
            // let brect = anchor.getBoundingClientRect();
            // const centerX = (brect.right - brect.left) / 2;
            // const centerY = (brect.top - brect.bottom) / 2;
            const centerX = 659.188;
            const centerY = 411.985;
            const base = (x - centerX);
            const height = (centerY - y);
            // const ratio= height / base;
            const theta = -Math.atan2(height, base) * 180 / 3.14;
            const rotatingcd = document.querySelector('.vinylcd');
            rotatingcd.style.transform = `rotate(${theta}deg)`;
            console.log(theta);
        }
    });
    const switchPage = () => {
        const cd = document.querySelector('.vinylcd');
        const blackBox = document.querySelector('.overlap-group')
        if (cd) {
            cd.style.transform = 'translateX(-55%)';
            cd.style.transition = 'transform 500ms '
            cd.classList.add('transitioned');
            setTimeout(() => {
                cd.style.transform = 'translateX(0%)';
                cd.style.transition = 'transform 500ms';
            }, 800)
            setTimeout(() => {
                navigate('/login')
            }, 1200);
            cd.onclick = null;
        }
    };

    return (
        <div className="desktop">
            <div className="div">
                <div className="signup-overlap-group">
                    <img className="vinylcd" alt="Vinyl cd" src={vinylcd} />
                    <div className="back-rect" />
                    <div className="edge-rect-bl" />
                    <div className="front-rect">
                        <div className="lightbox"></div>
                        <div className="lightbox-1"></div>
                        <div className="lightbox-2"></div>
                        <form type='submit' onSubmit={handleSubmit} style={{}}>
                            <input type="text" className="Name" name='Name' value={formData.value} onChange={handleInputChange} placeholder="UserName"></input>
                            <input type="email" className="Name" name="email" value={formData.value} onChange={handleInputChange} placeholder="Email Id"></input>
                            <input type="password" className="Name" name="password" value={formData.value} onChange={handleInputChange} placeholder="Password"></input>
                            <input type="password" className="Name" name="conf_password" value={formData.value} onChange={handleInputChange} placeholder="Confirm Password"></input>
                            <div style={{
                                textDecoration: 'none',
                                color: '#f39c12',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                transition: 'color 0.3s',
                                cursor: 'pointer',
                                display: 'inline-block',
                                marginRight: '10px',
                            }}
                                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                onMouseLeave={(e) => e.target.style.textDecoration = 'none'} onClick={switchPage}>Log In</div>
                            <button className="sbutton">  CLICK ME !  </button>
                        </form>
                    </div>
                    <div className="edge-rect-tr" />

                    <div className="signup">Sign Up</div>
                    <div className="screw" />
                    <div className="screw-2" />
                    <div className="screw-3" />
                    <div className="screw-4" />
                </div>
                <div className="overlap">
                    <p className="myusik">MYUSIK</p>
                </div>
            </div>
        </div>

    );
}