// Notification.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
    return <ToastContainer/>;
};

export const notify_info = (message) => {
    toast(message);
};

export const notify_success = (message) => {
    toast.success(message);
}

export const notify_error = (message) => {
    toast.error(message);
}

export const notify_warning = (message) => {
    toast.warning(message);
}

export const test_notify = () => {
    notify_info('This is an info message');
    notify_success('This is a success message');
    notify_error('This is an error message');
    notify_warning('This is a warning message');
};

export default Notification;