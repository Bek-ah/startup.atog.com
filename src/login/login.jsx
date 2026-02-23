import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, useNavigate } from "react-router-dom";

export function Login({user, setUser}) {
    const [text, setText] = React.useState('');
    const navigate = useNavigate();
    function loginUser(){
        localStorage.setItem('user', text);
        setUser(text);
    }
    function textChange(e){
        setText(e.target.value);
    }

    return (
        <main>
            <h1>Welcome!</h1>
            <h2>Login</h2>
            <form method="get" action="play">
                <label htmlFor="name">Student:</label>
                <input type="text" value={text} onChange={textChange} />
                <button className="login-buttons" onClick={loginUser}>Login</button>
            </form>
            <button className="login-buttons"><Link className="links" to="play">Play</Link></button>
            <div></div>
            <button className="login-buttons"><Link className="links" to="about">Questions?</Link></button>
            <div>
                <form method="get" action="../teacher/teacher.html">
                    <label htmlFor="name">Teacher:</label>
                    <input id="ID" placeholder="Teacher ID here" type="text" />
                    <button className="login-buttons"><Link className="links" to="teacher">Login</Link></button>
                </form>
            </div>
        </main>
  );
}