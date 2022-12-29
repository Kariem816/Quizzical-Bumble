import { useState, useRef, useEffect } from 'react';
import delay from '../utils/delay';

const useHold = (clickEvent, holdTime, step = holdTime, holdEvent = clickEvent) => {
    const [isHolding, setIsHolding] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isHolding) { //if holding mouse, we trigger `repeat`
            repeat(holdEvent);
        } else {
            stopCounter() //stop it if releasing mouse holding
        }
    }, [isHolding]);

    const startCounter = () => {
        if (intervalRef.current) return;
        clickEvent();
        setIsHolding(true);
        // delay(holdTime).then(() => {
        // setIsHolding(true);
        // });
    };

    const repeat = (action) => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            action();
        }, step);
    };

    const stopCounter = () => {
        setIsHolding(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return {
        onMouseDown: startCounter,
        onTouchStart: startCounter,
        onMouseUp: stopCounter,
        onTouchEnd: stopCounter,
        onMouseLeave: stopCounter,
        onTouchCancel: stopCounter
    };
};

export default useHold;