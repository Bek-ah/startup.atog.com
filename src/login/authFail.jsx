import React from 'react';

import Button from 'react-bootstrap/Button';
import { Popup } from './loginFailPopup';

export function Unauthenticated(props) {
  const [user, setUser] = React.useState(props.user);
  const [userT, setUserT] = React.useState(props.teacher);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [passwordT, setPasswordT] = React.useState('');

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: user, password: password }),
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
        <Button onClick={() => loginUser()} disabled={!user || !password}>
          Login
        </Button>
        <Button onClick={() => createUser()} disabled={!user || !password}>
          Create
        </Button>
      </div>

      <Popup message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
