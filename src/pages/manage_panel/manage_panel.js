import React, { useContext } from 'react';

import './manage_panel.css';

import useAPI from '../../API/api';
import { NotificationContext } from '../../components/notifications/NotificationList';

const Manage_panel = () => {
    const { addNotification } = useContext(NotificationContext);
    const { callAPI } = useAPI();

    return (
        <div className="manage-panel">
        </div>
    );
}

export default Manage_panel;