import { useContext } from "react";
import useAPI from "../API/api";
import { NotificationContext } from "../components/notifications/NotificationList";

const obtainJWT = async (email, password) => {
    const { addNotification } = useContext(NotificationContext);
    const { callAPI } = useAPI();
    const response = await callAPI('/login', 'POST', { email, password });
    if (response.status === 200) {
        localStorage.setItem('jwt', response.jwt);
        addNotification(0, 'Successfully logged in as ' + (email || 'guest'));
    } else {
        addNotification(1, 'Failed to login');
    }
}

export default obtainJWT;