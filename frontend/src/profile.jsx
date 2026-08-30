import { useEffect, useState } from "react";
import { InitialsAvatar } from "./UIComponents";
import "./profile.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Search, Users } from "lucide-react";

export function Profile(){
    const [username, setUsername] = useState("");
    const [userID, setUserID] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [workoutsNumber, setWorkoutsNumber] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                headers: {"Authorization": "Bearer " + token}
            });
            const data = await response.json();
            if(response.status == 401){
                navigate("/login");
                return;
            }
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
                <div className="profile-header-box">
                    <div className="profile-header-name-box">
                        <p className="profile-header-name">{username}</p>
                        <p className="profile-header-id">ID: {userID}</p>
                    </div>
                    <div className="profile-header-data">
                        <div className="profile-header-data-box profile-header-data-left">
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
        </div>
    )
}

export function SearchUser(){
    const [activeUsers, setActiveUsers] = useState();
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const params = new URLSearchParams({q: query});
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/search?${params}`);
            const data = await response.json();
            setUsers(data);
        }
        fetchUsers();
    }, [query]);

    useEffect(() => {
        async function fetchActiveUsers() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/count`);
            const data = await response.json();
            setActiveUsers(data);
        }
        fetchActiveUsers();
    }, [])
    return(
        <div className="main-dashboard">
            <div className="search-header">
                <div className="search-header-text">
                    <p className="text-h1">Connect with <span className="text-italic">Athletes</span></p>
                    <p className="search-body-text">Find training partners, follow proffesional coaches, and see how the community is progressing.</p>
                </div>
                <div className="search-active-box">
                    <Users className="search-active-icon"/>
                    <p>{activeUsers} Active Members</p>
                </div>
            </div>
            <div className="search-main-input">
                <Search className="inp-search-icon"/>
                <input className="inp-search" type="search" placeholder="Search users..." value={query} onChange={(e) => setQuery(e.target.value)}/>
            </div>
            <div className="search-users-cards">
                {users.map((user) => (
                    <Link to={`/profile/${user.username}`} className="user-card" key={user.id}>
                        <p>{user.username}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export function ShowProfile(){
    const [userID, setUserID] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [workoutsNumber, setWorkoutsNumber] = useState();
    const navigate = useNavigate();
    const {username} = useParams();

    useEffect(() => {
        async function fetchProfile() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${username}`);
            const data = await response.json();
            if(response.status == 401){
                navigate("/login");
                return;
            }
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
                <div className="profile-header-box">
                    <div className="profile-header-name-box">
                        <p className="profile-header-name">{username}</p>
                        <p className="profile-header-id">ID: {userID}</p>
                    </div>
                    <div className="profile-header-data">
                        <div className="profile-header-data-box profile-header-data-left">
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
        </div>
    )
}