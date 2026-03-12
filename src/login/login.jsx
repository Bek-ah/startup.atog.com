import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, useNavigate } from "react-router-dom";
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({user, setUser, teacher, setTeacher, score, setScore, authState, onAuthChange}) {
    const [text, setText] = React.useState('');
    const [text2, setText2] = React.useState('');
    const navigate = useNavigate();
    function loginUser(){
        localStorage.setItem('user', text);
        setUser(text);
    }
    function textChange(e){
        setText(e.target.value);
    }
    function textChange2(e){
        setText2(e.target.value);
    }
    function guestUser(){
        localStorage.setItem('user', 'Guest');
        setUser('Guest');
        navigate('play');
    }
    function loginTeacher(){
        localStorage.setItem('teacher', text2);
        setTeacher(text2);
        navigate('teacher');
    }
    return (
        <main>
            <div>
                {authState !== AuthState.Unknown && <h1>Welcome!</h1>}
                {authState === AuthState.Authenticated && (
                  <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                )}
                {authState === AuthState.Unauthenticated && (
                  <Unauthenticated
                    userName={userName}
                    onLogin={(loginUserName) => {
                      onAuthChange(loginUserName, AuthState.Authenticated);
                    }}
                  />
                )}
            </div>



            <h1>Welcome!</h1>
            <h2>Login</h2>
            <form method="get" action="play">
                <label htmlFor="name">Student:</label>
                <input type="text" placeholder="Your name here" value={text} onChange={textChange} />
                <button className="login-buttons" onClick={loginUser}>Login</button>
            </form>
            <button className="login-buttons" onClick={guestUser}>Play</button>
            <div></div>
            <button className="login-buttons"><Link className="links" to="about">Questions?</Link></button>
            <div>
                <form method="get" action="teacher">
                    <label htmlFor="name">Teacher:</label>
                    <input type="text" placeholder="Teacher ID here" value={text2} onChange={textChange2} />
                    <button className="login-buttons" onClick={loginTeacher}>Login</button>
                </form>
            </div>
        </main>*/
  );
}