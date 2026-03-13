import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, useNavigate } from "react-router-dom";
import { Unauthenticated } from './authFail';
import { Authenticated } from './loggedIn';
import { AuthState } from './authState';

export function Login({user, setUser, teacher, setTeacher, score, setScore, authState, onAuthChange}) {
    const [text, setText] = React.useState('');
    const [text2, setText2] = React.useState('');
    const navigate = useNavigate();

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

    return (
        <main>
            <div>
                {authState !== AuthState.Unknown && <h1>Welcome!</h1>}
                {authState === AuthState.Authenticated && (
                  <Authenticated user={user} onLogout={() => onAuthChange(user, AuthState.Unauthenticated)} />
                )}
                {authState === AuthState.Unauthenticated && (
                  <Unauthenticated
                    user={user}
                    onLogin={(loginUser) => {
                      onAuthChange(loginUser, AuthState.Authenticated);
                    }}
                  />
                )}
            </div>
        </main>
  );
}