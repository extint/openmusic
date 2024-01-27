import React, { useEffect } from "react";
import "./Recent.css";
import { Link } from "react-router-dom";

export const Recent = (props) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = document.querySelector('.blur');
      if (cursor) {
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="recent-tab">
      <div className="blur"/>
      <div className="inner-recent-box">
        {props.container.map((item, index) => (
          <Link to="/song" key={index}>
            <div className="overlap">
              <div className="recent-text-wrapper">{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};