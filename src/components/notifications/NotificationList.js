import React, { createContext, useContext, useState, useCallback } from "react";
import Notification from "./Notification";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((level, message) => {
        setNotifications((prevNotifications) => {
            let newNotifications = [...prevNotifications];
            if (newNotifications.length >= 5) {
                newNotifications.shift(); // Remove the first (oldest) notification
            }
            newNotifications.push({ level, message, id: Date.now() }); // Add a unique id to each notification
            return newNotifications;
        });
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const NotificationList = () => {
    const { notifications } = useContext(NotificationContext);

    return (
        <div>
            {notifications.map((notification, index) => (
                <Notification key={notification.id} height={(notifications.length - index)*50+'px'} level={notification.level} message={notification.message} />
            ))}
        </div>
    );
};