import React from "react";
import "./player.css";
export const Player = () => {
    return (
        <div className="box">
            <div className="player-bar">
                {/* <div className="overlap-group">
                    <div className="overlap"> */}
                        <img className="pause" alt="Pause" src="pause-1.png" />
                        <img className="play-buttton" alt="Play buttton" src="play-buttton-1.png" />
                        <img className="fast-forward" alt="Fast forward" src="fast-forward-1.png" />
                        <img className="img" alt="Fast forward" src="fast-forward-2.png" />
                    {/* </div>
                </div> */}
            </div>
        </div>
    );
};