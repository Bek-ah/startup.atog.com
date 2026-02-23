import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export function Play({user}) {
    const [count, setCount] = React.useState(parseInt(localStorage.getItem('count')) || 1);
    const [clicks, setClicks] = React.useState(parseInt(localStorage.getItem('clicks')) || 1);
    const [score, setScore] = React.useState(parseFloat(localStorage.getItem('score')) || 0);
    const [pic, setPic] = React.useState(localStorage.getItem('pic') || '../../public/treble_clef.jpg');
    const navigate = useNavigate();

    function countClick(){
        setCount(count + 1);
        localStorage.setItem('count', (count + 1));
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
        var picNumb = Math.floor(Math.random() * (1+1-5));
        switch (picNumb) {
            case 1:
                return '../../public/noteA.png';
            case 2:
                return '../../public/noteB.png';
            case 3:
                return '../../public/noteC.png';
            case 5:
                return '../../public/noteE.png';
            case 4:
                return '../../public/noteD.png';
            default:
                return '../../treble_clef.jpg'
        }
    }

    return (
         <main>
             <img src={pic} width="302" height="228" alt="A treble clef"/>
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
                     <button onClick={countClick}>
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
                     <button onClick={countClick}>
                         <svg width="100" height="100">
                         <circle cx="50" cy="50" r="40"
                              stroke="black" stroke-width="4" fill="white" />
                         <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="20" dominant-baseline="middle">B</text>
                         Error
                         </svg>
                     </button>
                 </div>
                 <div class="letters">
                 <button onClick={countClick}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                          stroke="black" stroke-width="4" fill="white" />
                     <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="20" dominant-baseline="middle">C</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div class="letters">
                 <button onClick={countClick}>
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
                 <button onClick={countClick}>
                     <svg width="100" height="100">
                     <circle cx="50" cy="50" r="40"
                         stroke="black" stroke-width="4" fill="white" />
                     <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="20" dominant-baseline="middle">E</text>
                     Error
                 </svg>
                 </button>
                 </div>
                 <div class="letters">
                 <button onClick={countClick}>
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
                 <button onClick={countClick}>
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