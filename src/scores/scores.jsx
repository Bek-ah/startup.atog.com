import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export function Scores({user, count, score}) {
    const navigate = useNavigate();
    const submission = 0;
    function logoutUser(){
        localStorage.setItem('user', '');
        localStorage.setItem('count', 0);
        localStorage.setItem('score', 0);
        navigate('../');
    }
    function submitButton(){
        localStorage.setItem('submission', score);
        logoutUser();
    }
    function againButton(){
        localStorage.setItem('user', '');
        localStorage.setItem('count', 0);
        localStorage.setItem('score', 0);
        navigate('../play');
    }
    function aboutButton(){
        localStorage.setItem('user', '');
        localStorage.setItem('count', 0);
        localStorage.setItem('score', 0);
        navigate('../about');
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
            <button className="login-buttons" onClick={submitButton}>Submit</button>
            <div></div>
                <div></div>
            <button className="login-buttons" onClick={againButton}>Again!</button>
            <div></div>
            <div></div>
            <button className="login-buttons" onClick={aboutButton}>Questions?</button>
        </main>
  );
}