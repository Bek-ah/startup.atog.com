import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export function Scores({subDate, setSubDate, user, count, score, submission, setSubmission, setSU, submissionuser}) {
    const navigate = useNavigate();
    const date = new Date();
    const [message, setMessage] = React.useState('You are awesome!');
    const [quoteAuthor, setQuoteAuthor] = React.useState('Me');

    React.useEffect(() => {
        fetch('https://quoteslate.vercel.app/api/quotes/random?tags=motivation')
        .then((response) => response.json())
        .then((data) => {
            setMessage(data.quote);
            setQuoteAuthor(data.author);
            })
        .catch();
    }, []);
    function logoutUser(){
        localStorage.setItem('user', '');
        localStorage.setItem('count', 0);
        localStorage.setItem('score', 0);
        navigate('../');
    }
    function submitButton(){
        setSubmission(score);
        localStorage.setItem('submission', score);
        setSU(user);
        localStorage.setItem('submissionuser', user);
        setSubDate(Date());
        localStorage.setItem('subDate', Date());
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
                <p id="encouragement-api">{message}</p>
                <p id="encouragement-api">-{quoteAuthor}</p>
            </div>
            <button className="login-buttons" onClick={logoutUser}>Home</button>
            <div></div>
            <div></div>
            <button className="login-buttons" onClick={submitButton}>Submit</button>
            <div></div>
                <div></div>
            <button className="login-buttons" onClick={againButton}>Again!</button>
            <div></div>
            <div></div>
            <button className="login-buttons" onClick={aboutButton}>Questions?</button>
            <div></div>
            <p>Quotes powered by the QuoteSlate API</p>
        </main>
  );
}