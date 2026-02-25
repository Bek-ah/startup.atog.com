import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export function Scores({user, count, score}) {
    const navigate = useNavigate();

    function logoutUser(){
        localStorage.setItem('user', '');
        localStorage.setItem('count', 0);
        localStorage.setItem('score', 0);
        navigate('../');
    }

    return (
        <main>
            <h2>{user}'s Score</h2>
            <p>Accuracy: </p> <p>{score}%</p>
            <div>
                <p id="encouragement-api">You're Amazing API!</p>
            </div>
            <button className="login-buttons" onClick={logoutUser}>Log Out</button>
            <div></div>
            <div></div>
            <button className="login-buttons"><Link className="links" to="../">Submit</Link></button>
            <div></div>
                <div></div>
            <button className="login-buttons"><Link className="links" to="../play">Again!</Link></button>
            <div></div>
            <div></div>
            <button className="login-buttons"><Link className="links" to="../about">Questions?</Link></button>
        </main>
  );
}