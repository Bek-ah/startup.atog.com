import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

export function Play({user}) {
    const [count, setCount] = React.useState(parseFloat(localStorage.getItem('count')) || 1);
    const [clicks, setClicks] = React.useState(parseFloat(localStorage.getItem('clicks')) || 1);
    const [score, setScore] = React.useState(parseFloat(localStorage.getItem('score')) || 0);
    const [pic, setPic] = React.useState(localStorage.getItem('pic') || '/treble_clef.jpg');
    const navigate = useNavigate();
    const picNumb = useState(() => Math.floor(Math.random() * 7));
    const pictures = [
        {id: 1, src: '/noteA.png'},
        {id: 2, src: '/noteB.png'},
        {id: 3, src: '/noteC.png'},
        {id: 4, src: '/noteD.png'},
        {id: 5, src: '/noteE.png'},
        {id: 6, src: '/noteF.png'},
        {id: 7, src: '/noteG.png'}
    ]
    const [bP, setbP] = React.useState(localStorage.getItem('bp') || 0);
    const [pN, setpN] = React.useState(localStorage.getItem('pN') || 0);
    useEffect(() => {
        localStorage.setItem('bP', bP)
        }, [bP])
    useEffect(() => {
        localStorage.setItem('pN', pN)
        }, [pN])
    useEffect(() => {
        localStorage.setItem('clicks', clicks)
        }, [clicks])
    useEffect(() => {
        localStorage.setItem('count', count)
        }, [count])
    useEffect(() => {
        localStorage.setItem('score', score)
        }, [score])
    useEffect(() => {
        localStorage.setItem('pic', pic)
        }, [pic])

    function countClick(buttonPushed){
        const correct = pic === buttonPushed;
        const countCorrect = correct ? count + 1 : count;
        const clicksCorrect = clicks + 1;
        setbP(buttonPushed);
        setpN(pic);
        setClicks(clicksCorrect);
        setScore((countCorrect/clicksCorrect)*100);
        setCount(countCorrect);
        var nextPic = Math.floor(Math.random() * 7);
        setPic(pictures[nextPic].src);
    }

    function resetCount(){
        setClicks(0)
        setCount(0)
        navigate('../scores');
    }

    return (
         <main>
             <img src={ pic } width="302" height="228" alt="A picture of a note"/>
             <div></div>
             <button className="login-buttons" onClick={resetCount}><Link className="links" to="../scores">Stop</Link></button>
             <div></div>
             <button className="login-buttons"><Link className="links" to="../about">About</Link></button>
             <div></div>
             <div class="users">
                 <span class="player-name">{user}</span>
             </div>
             <div>
                 <label for="count">Accuracy:</label>
                    <input type="text" id="count" value={'%' + score} readOnly/>
             </div>
             <div class="letterlist">
                 <div class="letters">
                     <button onClick={() => countClick('/noteA.png')}>
                         <svg width="100" height="100">
                             <circle cx="50" cy="50" r="40"
                             stroke="black" stroke-width="4" fill="white" />
                             <text x="50%" y="50%"
                              text-anchor="middle" fill="black" font-size="20"
                              dominant-baseline="middle">A</text>
                         Error
                         </svg>
                     </button>
                 </div>
                 <div class="letters">
                     <button onClick={() => countClick('/noteB.png')}>
                         <svg width="100" height="100">
                         <circle cx="50" cy="50" r="40"
                              stroke="black" stroke-width="4" fill="white" />
                         <text x="50%" y="50%" text-anchor="middle" fill="black"
                          font-size="20" dominant-baseline="middle">B</text>
                         Error
                         </svg>
                     </button>
                 </div>
                 <div class="letters">
                 <button onClick={() => countClick('/noteC.png')}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                          stroke="black" stroke-width="4" fill="white" />
                     <text x="50%" y="50%" text-anchor="middle" fill="black"
                      font-size="20" dominant-baseline="middle">C</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div class="letters">
                 <button onClick={() => countClick('/noteD.png')}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                          stroke="black" stroke-width="4" fill="white" />
                     <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="20"
                          dominant-baseline="middle">D</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div class="letters">
                 <button onClick={() => countClick('/noteE.pdf')}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                         stroke="black" stroke-width="4" fill="white" />
                     <text x="50%" y="50%" text-anchor="middle" fill="black"
                     font-size="20" dominant-baseline="middle">E</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div class="letters">
                 <button onClick={() => countClick('/noteF.png')}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                         stroke="black" stroke-width="4" fill="white" />
                     <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="20"
                          dominant-baseline="middle">F</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div class="letters">
                 <button onClick={() => countClick('/noteG.png')}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                         stroke="black" stroke-width="4" fill="white" />
                     <text x="50%" y="50%" text-anchor="middle" fill="black"
                     font-size="20" dominant-baseline="middle">G</text>
                     Error
                 </svg>
                 </button>
                 </div>
             </div>
         </main>
    );
}