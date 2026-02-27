import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import { Submission, SubmissionUpdated } from './submissionNotification.js';

export function Teacher({user, score, teacher}) {
    const [scores, setScores] = React.useState([]);
    const [events, setEvent] = React.useState([]);
    setInterval(() => {
      const score = Math.floor(Math.random() * 3000);
      const date = new Date().toLocaleDateString();
      const userName = 'Jane Doe got a new grade!';
      this.broadcastSubmission(userName);
    }, 5000);
  React.useEffect(() => {
    const scoresText = localStorage.getItem('score');
    if (scoresText) {
      setScores(JSON.parse(scoresText));
    }
  }, []);
  const scoreRows = [];
  if (scores.length) {
    for (const [i, scores] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{score.name.split('@')[0]}</td>
          <td>{score.score}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>No students have submitted</td>
      </tr>
    );
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = 'unknown';
      if (event.type === GameEvent.End) {
        message = `scored ${event.value.score}`;
      }
    messageArray.push(
      <div key={i} className='event'>
        <span className={'player-event'}>{event.from.split('@')[0]}</span>
        {message}
      </div>
      );
      }
      return messageArray;
    }

  return (
    <main class="teacher-background">
    <h2>Scores</h2>
    <table>
        <thead>
        <tr>
            <th>   </th>
            <th>Student Name</th>
            <th>Score</th>
            <th>Date</th>
        </tr>
        </thead>
        <tbody>{scoreRows}</tbody>
    </table>
        <button className="login-buttons"><Link className="links" to="../">Home</Link></button>
        <div></div>
        <div></div>
        <button className="login-buttons"><Link className="links" to="../play">Play</Link></button>
        <div></div>
        <div></div>
        <button className="login-buttons"><Link className="links" to="../about">Questions?</Link></button>
    <div></div>
    <div class="notification">
        Student
        <span>{user}</span>
        <div>{createMessageArray()}</div>
    </div>
    </main>

  );
}