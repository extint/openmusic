import React  from "react";
import "./style.css";
import vinylcd from './vinyl-cd.png'
// import screw from './screw.svg'
import navbar from './navbar.png'
import { useState } from "react";

export const Desktop = () => {
    const handleSubmit=(e)=>{
        console.log(e)
        console.log('hi')
        // preventDefault() 
    }
    const[name,nameHandler]=useState('')
    const handleName=(e)=>{
        nameHandler(e.target.value)
        console.log(name)
    }
    return (
        <div className="desktop">
            <div className="div">
                <div className="overlap-group">
                    <img className="vinyl-cd" alt="Vinyl cd" src={vinylcd}/>
                    {/* <div className="dynamic-name"></div> */}
                    {/* ("#dynamic-name").circleType({radius: 800}); */}
                    <div className="back-rect" />
                    <div className="edge-rect-bl" />
                    <div className="front-rect">
                        <div className="lightbox"></div>
                        <div className="lightbox-1"></div>
                        <div className="lightbox-2"></div>
                        <form type='submit' onSubmit={(event)=>event.preventDefault}>
                        <input className="name" name='name' value={name} onChange={handleName }></input>
                        <input type="email" className="name"></input>
                        <input type="password" className="name"></input>
                        <input type="password" className="name"></input>
                        <button className="button" onClick={handleSubmit}>  CLICK ME !  </button>
                        {/* <img className="email-id" alt="Email id" src="email-id.svg" /> */}
                        {/* <div className="password" /> */}
                        {/* <div className="confirm-password" /> */}
                        </form>
                    </div>
                    <div className="edge-rect-tr" />
                    {/* <div className="button" /> */}
                    {/* <div className="clickme"> </div> */}
                    {/* <img className="shadow-horiz" alt="Shadow horiz" src="shadow-horiz.svg" /> */}
                    <div className="signup">Sign Up</div>
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