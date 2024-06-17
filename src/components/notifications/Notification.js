import React, { useState, useEffect } from "react";
import './Notification.css';

const Notification = ({level, message, height}) => {
    const [isVisible, setIsVisible] = useState(true);
    let color = "";

    if (level === 0) {
        color = "blue";
    } else if (level === 1) {
        color = "yellow";
    } else if (level === 2) {
        color = "red";
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <div className='notification' style={{'--height': height, '--triangle-color': color, borderColor: color}}>
            {message}
        </div>
    );
}

export default Notification;