import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

export default function Confetti({ shootConfetti, setShootConfetti }){

    const [windowDimension, setWindowDimension] = useState({width: window.innerWidth, height: window.innerHeight})

    const detectSize = () => {
        setWindowDimension({width: window.innerWidth, height: window.innerHeight})
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        return() => {
            window.removeEventListener('resize', detectSize)
        }
    }, [windowDimension]);

    return(
        <>
            {/*<button style={{ position: "fixed", top: "50%", left: "50%" }} onClick={() => setShootConfetti(!shootConfetti)}>CONFETTI CANNON</button>*/}
            {shootConfetti && <ReactConfetti
                width={windowDimension.width}
                height={windowDimension.height}
                tweenDuration={500}
            />}
        </>
    )
}