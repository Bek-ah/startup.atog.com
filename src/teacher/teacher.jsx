import React from 'react';
import { Link } from "react-router-dom";

export function Teacher() {
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
        <tbody>
            <tr>
                <td>1</td>
                <td>John Smith</td>
                <td>80%</td>
                <td>3/1/2026</td>
            </tr>
        </tbody>
            <tbody>
            <tr>
                <td>2</td>
                <td>Jane Doe</td>
                <td>95%</td>
                <td>3/2/2026</td>
            </tr>
        </tbody>
    </table>
        <button className="login-buttons"><Link className="links" to="../">Home</Link></button>
        <div></div>
        <div></div>
        <button className="login-buttons"><Link className="links" to="../play">Play</Link></button>
        <div></div>
        <div></div>
        <button className="login-buttons"><Link className="links" to="../about">Questions?</Link></button>
    <div></div>
    <ul class="notification">
        <li class="student-name">John Smith grade changed</li>
        <li class="student-name">Jane Doe grade changed</li>
    </ul>
    </main>

  );
}