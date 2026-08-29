import { useEffect, useState } from "react";
import { InitialsAvatar } from "./UIComponents";
import "./profile.css"
import { useNavigate } from "react-router-dom";

function Profile(){
    const [username, setUsername] = useState();
    const [userID, setUserID] = useState();
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();
    const [workoutsNumber, setWorkoutsNumber] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                headers: {"Authorization": "Bearer " + token}
            });
            const data = await response.json();
            /*if(!response.ok){
                navigate("/login");
            }*/
            setUsername(data.username);
            setUserID(data.user_id);
            setFollowers(data.followers);
            setFollowing(data.following);
            setWorkoutsNumber(data.workouts);
        }
        fetchProfile();
    }, []);

    return(
        <div className="main-dashboard">
            <div className="profile-header">
                <div className="profile-picture">
                    <InitialsAvatar username={username} variant="profile"/>
                </div>
                <div className="profile-header-name-box">
                    <p className="profile-header-name body-text-h1">{username}</p>
                    <p className="profile-header-id">{userID}</p>
                </div>
                <div className="profile-header-data">
                    <div className="profile-header-data-box">
                        <p className="followers-number">{followers}</p>
                        <p>FOLLOWERS</p>
                    </div>
                    <div className="profile-header-data-box">
                        <p className="followers-number">{following}</p>
                        <p>FOLLOWING</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;