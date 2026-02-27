import React from 'react';
import { Link } from "react-router-dom";

export function About() {
  return (
    <main>
        <button className="login-buttons"><Link className="links" to="../">Log Out</Link></button>
        <div></div>
        <button className="login-buttons"><Link className="links" to="../play">Play Again</Link></button>
        <p>This game is made to make starting music easy! Just press the names of the notes that appear. When you've done 10, you'll be able to submit your score or play again! Your teacher will see your submission and the date!</p>
    </main>
  );
}