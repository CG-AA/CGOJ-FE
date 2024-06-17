import React, { useContext } from 'react';
import { NotificationContext } from '../components/notifications/NotificationList';

const SomeComponent = () => {
    const { addNotification } = useContext(NotificationContext);

    const handleClick = () => {
        addNotification(Math.floor(Math.random()*3), Math.random());
    };

    return <button onClick={handleClick}>Add notification</button>;
};

export default SomeComponent;