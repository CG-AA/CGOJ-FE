import React, {useState} from "react";
import 

function Profile() {

    const [profile, setProfile] = useState({
        id: 0,
        username: '',
        email: ''
    });

    return (
        <div className="profile">
            <h1>{profile.username}</h1>
            <p>{profile.email}</p>
            <p>{profile.first_name}</p>
            <p>{profile.last_name}</p>
        </div>
    );
}

export default Profile;