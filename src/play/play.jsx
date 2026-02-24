import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export function Play({user}) {
    const [count, setCount] = React.useState(parseFloat(localStorage.getItem('count')) || 1);
    const [clicks, setClicks] = React.useState(parseFloat(localStorage.getItem('clicks')) || 1);
    const [score, setScore] = React.useState(parseFloat(localStorage.getItem('score')) || 0);
    const [pic, setPic] = React.useState(localStorage.getItem('pic') || '../../public/treble_clef.jpg');
    const navigate = useNavigate();
    const picNumb = Math.floor(Math.random() * 7) + 1;
    const pictures = [
        {id: 1, src: '../../public/noteA.png'},
        {id: 2, src: '../../public/noteB.png'},
        {id: 3, src: '../../public/noteC.png'},
        {id: 4, src: '../../public/noteD.png'},
        {id: 5, src: '../../public/noteE.png'},
        {id: 6, src: '../../public/noteF.png'},
        {id: 7, src: '../../public/noteG.png'}
    ]

    function isRight(buttonPushed){
        if (pictures[pic] == buttonPushed){
            return true;
        }
        return false;
    }
    function countClick(buttonPushed){
        if(isRight){
        setCount(count + 1);
        localStorage.setItem('count', (count + 1));
        }
        setClicks(clicks + 1);
        localStorage.setItem('clicks', clicks + 1);
        setScore(count/clicks);
        localStorage.setItem('score', count/clicks);
        var nextPic = getPicture();
        setPic(nextPic);
        localStorage.setPic('pic', nextPic);
    }

    function resetCount(){
        setClicks(0)
        localStorage.setItem('clicks', 0);
        navigate('../scores');
    }

    function getPicture(){
        return pictures[picNumb].src;
    }

    return (
         <main>
             <img src={pictures[picNumb].src} width="302" height="228" alt="A picture of a note"/>
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
                     <button onClick={() => countClick(1)}>
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
                     <button onClick={() => countClick(2)}>
                         <svg width="100" height="100">
                         <circle cx="50" cy="50" r="40"
                              stroke="black" stroke-width="4" fill="white" />
                         <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="20" dominant-baseline="middle">B</text>
                         Error
                         </svg>
                     </button>
                 </div>
                 <div class="letters">
                 <button onClick={() => countClick(3)}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                          stroke="black" stroke-width="4" fill="white" />
                     <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="20" dominant-baseline="middle">C</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div class="letters">
                 <button onClick={() => countClick(4)}>
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
                 <button onClick={() => countClick(5)}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                         stroke="black" stroke-width="4" fill="white" />
                     <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="20" dominant-baseline="middle">E</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div class="letters">
                 <button onClick={() => countClick(6)}>
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
                 <button onClick={() => countClick(7)}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                         stroke="black" stroke-width="4" fill="white" />
                     <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="20" dominant-baseline="middle">G</text>
                     Error
                 </svg>
                 </button>
                 </div>
             </div>
         </main>
    );
}