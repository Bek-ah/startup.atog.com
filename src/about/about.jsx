import React from 'react';
import { Link } from "react-router-dom";

export function About({user}) {
  return (
    <main>
        <p> user: {user} </p>
        <button className="login-buttons"><Link className="links" to="../">Log Out</Link></button>
        <div></div>
        <button className="login-buttons"><Link className="links" to="../play">Play Again</Link></button>
        <p>This game is made to make starting music easy! Just press the names of the notes that appear until your score is what you want to submit, then click submit. Your teacher will see your submission and the date!</p>
    </main>
  );
}