import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
    return <ToastContainer/>;
};

export const notify_info = (message) => {
    toast(message, {
        duration: 3000,
        gravity: 'bottom'
    });
};

export const notify_success = (message) => {
    toast.success(message, {
        duration: 3000,
        gravity: 'bottom'
    });
};

export const notify_error = (message) => {
    toast.error(message, {
        duration: 3000,
        gravity: 'bottom'
    });
};

export const notify_warning = (message) => {
    toast.warning(message, {
        duration: 3000,
        gravity: 'bottom'
    });
};

export default Notification;