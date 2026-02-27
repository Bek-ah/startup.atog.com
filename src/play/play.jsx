import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

export function Play({user, score, setScore}) {
    const [count, setCount] = React.useState(parseFloat(localStorage.getItem('count')) || 1);
    const [clicks, setClicks] = React.useState(parseFloat(localStorage.getItem('clicks')) || 1);
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
        localStorage.setItem('score', score)
        setCount(countCorrect);
        if (clicksCorrect === 10 || clicksCorrect > 10){
            setCount(0);
            setClicks(0);
            navigate('../scores')
        }
        var nextPic = Math.floor(Math.random() * 7);
        setPic(pictures[nextPic].src);
    }

    function aboutButton(){
        localStorage.setItem('user', '');
        localStorage.setItem('count', 0);
        localStorage.setItem('score', 0);
        navigate('../about');
    }
    function logoutButton(){
        localStorage.setItem('user', '');
        localStorage.setItem('count', 0);
        localStorage.setItem('score', 0);
        navigate('../');
    }

    return (
         <main>
             <img src={ pic } width="302" height="228" alt="A picture of a note"/>
             <div></div>
             <button className="login-buttons" onClick={logoutButton}>Logout</button>
             <div></div>
             <button className="login-buttons"><Link className="links" to="../about">About</Link></button>
             <div></div>
             <div className="users">
                 <span className="player-name">{user}</span>
             </div>
             <div>
                 <label htmlFor="count">Accuracy:</label>
                    <input type="text" id="count" value={'%' + score} readOnly/>
             </div>
             <div className="letterlist">
                 <div className="letters">
                     <button onClick={() => countClick('/noteA.png')}>
                         <svg width="100" height="100">
                             <circle cx="50" cy="50" r="40"
                             stroke="black" strokeWidth="4" fill="white" />
                             <text x="50%" y="50%"
                              textAnchor="middle" fill="black" fontSize="20"
                              dominantBaseline="middle">A</text>
                         Error
                         </svg>
                     </button>
                 </div>
                 <div className="letters">
                     <button onClick={() => countClick('/noteB.png')}>
                         <svg width="100" height="100">
                         <circle cx="50" cy="50" r="40"
                              stroke="black" strokeWidth="4" fill="white" />
                         <text x="50%" y="50%" textAnchor="middle" fill="black"
                          fontSize="20" dominantBaseline="middle">B</text>
                         Error
                         </svg>
                     </button>
                 </div>
                 <div className="letters">
                 <button onClick={() => countClick('/noteC.png')}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                          stroke="black" strokeWidth="4" fill="white" />
                     <text x="50%" y="50%" textAnchor="middle" fill="black"
                      fontSize="20" dominantBaseline="middle">C</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div className="letters">
                 <button onClick={() => countClick('/noteD.png')}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                          stroke="black" strokeWidth="4" fill="white" />
                     <text x="50%" y="50%" textAnchor="middle" fill="black" fontSize="20"
                          dominantBaseline="middle">D</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div className="letters">
                 <button onClick={() => countClick('/noteE.png')}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                         stroke="black" strokeWidth="4" fill="white" />
                     <text x="50%" y="50%" textAnchor="middle" fill="black"
                     fontSize="20" dominantBaseline="middle">E</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div className="letters">
                 <button onClick={() => countClick('/noteF.png')}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                         stroke="black" strokeWidth="4" fill="white" />
                     <text x="50%" y="50%" textAnchor="middle" fill="black" fontSize="20"
                          dominantBaseline="middle">F</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div className="letters">
                 <button onClick={() => countClick('/noteG.png')}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                         stroke="black" strokeWidth="4" fill="white" />
                     <text x="50%" y="50%" textAnchor="middle" fill="black"
                     fontSize="20" dominantBaseline="middle">G</text>
                     Error
                 </svg>
                 </button>
                 </div>
             </div>
         </main>
    );
}