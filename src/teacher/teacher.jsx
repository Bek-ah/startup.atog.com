import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

export function Teacher() {
    const [submissions, setSubmissions] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/teacher')
      .then((response) => response.json())
      .then((submissions) => {
        setSubmissions(submissions);
      });
  }, []);
  const scoreRows = [];
  if (submissions.length){
      for (const [i, submission] of submissions.entries()) {
          scoreRows.push(
              <tr key={i}>
                  <td>{i}</td>
                  <td>{submission.name}</td>
                  <td>{submission.score}</td>
                  <td>{submission.date}</td>
              </tr>
          )
      }
  } else {
      scoreRows.push(
          <tr key='0'>
              <td>  </td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
          </tr>
      )
  }
  return (
    <main className="teacher-background">
    <h2>Scores</h2>
    <table className='score-table'>
        <thead>
        <tr>
            <th>   </th>
            <th>Student Name</th>
            <th>Score</th>
            <th>Date</th>
        </tr>
        </thead>
        <tbody>{ scoreRows }</tbody>
    </table>
    <div></div>
        <button className="login-buttons"><Link className="links" to="../">Home</Link></button>
        <div></div>
        <div></div>
        <button className="login-buttons"><Link className="links" to="../play">Play</Link></button>
        <div></div>
        <div></div>
        <button className="login-buttons"><Link className="links" to="../about">Questions?</Link></button>
    <div></div>
    </main>

  );
}