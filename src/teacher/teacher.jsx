import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

export function Teacher({submissionuser, submission, subDate}) {
    const submissionList = useState(() => localStorage.getItem('submissionList') || 0);
    const userList = useState(() => localStorage.getItem('userList') || '');
    const dateList = useState(() => localStorage.getItem('dateList') || '')

    useEffect(() => {
        submissionList.push(submission);
        userList.push(submissionuser);
        dateList.push(subDate);
    }, [submission])
  return (
    <main className="teacher-background">
              <p>-{userList}-</p>
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
        <tbody>
            <tr>
                <td>1</td>
                <td>"Jane Doe"</td>
                <td>{submission}%</td>
                <td>2/26/2026</td>
            </tr>
        </tbody>
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