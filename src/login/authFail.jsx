import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import { Popup } from './loginFailPopup';

export function Unauthenticated(props) {
  const [user, setUser] = React.useState(props.user);
  const [teacher, setTeacher] = React.useState(props.teacher);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [passwordT, setPasswordT] = React.useState('');
  const [teacherAuth, setTeacherAuth] = React.useState(props.teacherAuth);
    useEffect(() => {
      localStorage.setItem('teacherAuth', 'false')
      setTeacherAuth('false')
    }, [])
  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }
  async function loginTeacher() {
    loginOrCreateTeacher(`/api/auth/loginTeacher`);
  }
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }
  async function createTeacher() {
    loginOrCreateTeacher(`/api/auth/createTeacher`);
  }
  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ user: user, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('user', user);
      props.onLogin(user);
    } else {
      const body = await response.json();
      setDisplayError(`Error: ${body.msg}`);
    }
  }
  async function loginOrCreateTeacher(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ teacher: teacher, passwordT: passwordT }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      setTeacherAuth(true);
      localStorage.setItem('teacherAuth', 'true');
      localStorage.setItem('teacher', teacher);
      props.onLogin(teacher);
    } else {
      const body = await response.json();
      setDisplayError(`Error: ${body.msg}`);
    }
  }
  return (
    <>
      <div>
        <h2>Student Login:</h2>
        <div>
          <input type='text' value={user} onChange={(e) => setUser(e.target.value)} placeholder='Username here' />
        </div>
        <div>
          <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        </div>
        <Button className='login-buttons' onClick={() => loginUser()} disabled={!user || !password}>
          Login
        </Button>
        <Button className='login-buttons' onClick={() => createUser()} disabled={!user || !password}>
          Create
        </Button>
        <h2>Teacher Login:</h2>
        <div>
          <input type='text2' value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder='Username here' />
        </div>
        <div>
          <input type='password' onChange={(e) => setPasswordT(e.target.value)} placeholder='Password' />
        </div>
        <Button className='login-buttons' onClick={() => loginTeacher()} disabled={!teacher || !passwordT}>
          Login
        </Button>
        <Button className='login-buttons' onClick={() => createTeacher()} disabled={!teacher || !passwordT}>
          Create
        </Button>
      </div>

      <Popup message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
