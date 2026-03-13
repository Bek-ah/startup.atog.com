import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('user');
        props.onLogout();
      });
  }

  return (
    <div>
      <div className='playerName'>{props.user}</div>
      <Button className='login-buttons' variant='primary' onClick={() => navigate('/play')}>
        Start
      </Button>
      <Button className='login-buttons' variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
