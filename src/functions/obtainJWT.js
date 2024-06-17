import React, { useState } from "react";

import useAPI from "../API/api";
import { NotificationContext } from "../components/notifications/NotificationList";

const obtainJWT = async () => {
    const addNotification = useState(NotificationContext);
    const { _return, loading, error, callAPI } = useAPI();
    let jwt = localStorage.getItem('jwt');
    if (!jwt) {
        await callAPI('/obtain-jwt', {});
        if(error) {
            addNotification(2, error);
            return;
        }
        localStorage.setItem('jwt', _return);
    }
}


export default obtainJWT;