import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';
import { AuthState } from './login/authState';
import { Teacher } from './teacher/teacher';

export default function App() {
    const [user, setUser] = React.useState(() => localStorage.getItem('user') || '');
    const [teacher, setTeacher] = React.useState(() => localStorage.getItem('teacher') || '');
    const [count, setCount] = React.useState(() => localStorage.getItem('count') || 0);
    const [score, setScore] = React.useState(parseFloat(localStorage.getItem('score')) || 0);
    const [submission, setSubmission] = React.useState(parseFloat(localStorage.getItem('submission')) || 0);
    const [submissionuser, setSU] = React.useState(parseFloat(localStorage.getItem('submissionuser')) || '');
    const [subDate, setSubDate] = React.useState(parseFloat(localStorage.getItem('subDate')) || '');
    const currentAuthState = user ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [teacherAuth, setTeacherAuth] = React.useState(() => localStorage.getItem('teacherAuth') || 'false');

    return (
      <BrowserRouter>
      <header>
          <h1>AtoG</h1>
      </header>

      <Routes>
        <Route path='/' element={<Login teacher={teacher} setTeacher={setTeacher} user={user} setUser={setUser} count={count} score={score}
           authState={authState} teacherAuth={teacherAuth} setTeacherAuth={setTeacherAuth}
           onAuthChange={(user, authState) => {
           setAuthState(authState);
           setUser(user);
           }}
         />} />
        <Route path='/play' element={<Play user={user} setUser={setUser} score={score} setScore={setScore} />} />
        <Route path='/scores' element={<Scores subDate={subDate} setSubDate={setSubDate} submissionuser={submissionuser} setSU={setSU} submission={submission} setSubmission={setSubmission} user={user} setUser={setUser} count={count} setCount={setCount} score={score} />} />
        <Route path='/about' element={<About user={user} setUser={setUser} />} />
        <Route path='/teacher' element={<Teacher subDate={localStorage.getItem('subDate')} submissionuser={localStorage.getItem('submissionuser')} submission={submission} teacher={teacher} user={user} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

        <footer>
            <span className="text-reset">Rebekah Evans </span>
            <NavLink to="https://github.com/Bek-ah/chess.git">Github Link</NavLink>
        </footer>
        </BrowserRouter>

  );
}
function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}