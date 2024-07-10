import React, { useContext } from 'react';

import './ManagePanel.css';

import useAPI from '../../API/api';
import { NotificationContext } from '../../components/notifications/NotificationList';

const Manage_panel = () => {
    const { addNotification } = useContext(NotificationContext);
    const { callAPI } = useAPI();
    const [permissions, setPermissions] = useState([]);
    //fetch user's permissions
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await callAPI('/permissions', 'GET', null);
                if (response.status === 404) {
                    addNotification(1, 'Please log in first');
                    window.location.replace('/login');
                } else {
                    setPermissions(response);
                }
            } catch (error) {
            }
        };

        fetchPermissions();
    }, [callAPI, addNotification]);

    return (
        <></>
    );
}

export default Manage_panel;