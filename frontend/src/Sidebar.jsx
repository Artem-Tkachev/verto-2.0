import Dashboard from "./dashboard"
import "./Slidebar.css"
import { InitialsAvatar, Input, Li } from "./UIComponents"
import { LayoutDashboard, CircleUser, Dumbbell, CirclePlus, UserSearch, Trophy, Settings } from "lucide-react"
import Verto_logo from "./assets/Verto_logo.svg";
import { useEffect, useState } from "react";

export function Slidebar(){
    const [username, setUsername] = useState();

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
        }
        fetchProfile();
    }, []);
    

    return(
    <div className="slidebar">
        <div className="logo-block">
            <img src={Verto_logo} alt="logo" className="logo"/>
            <p className="logo-text">Verto</p>
        </div>
        <div className="slidebar-list-box">
            <ul className="slidebar-list">
                <Li icon={LayoutDashboard} text="Dashboard" link="/dashboard"/>
                <Li icon={Dumbbell} text="My Workouts" link="/workouts" end={true}/>
                <Li icon={CirclePlus} text="New Workout" link="/workouts/upload"/>
                <Li icon={UserSearch} text="Search Users" link="/search"/>
                <Li icon={CircleUser} text="Profile" link="/profile" end={true}/>
            </ul>
        </div>
        <div className="profile-box">
            <div className="profile-box-content">
                <div className="profile-picture">
                    <InitialsAvatar username={username} variant="sidebar"/>
                </div>
                <div className="profile-name-text">
                    <p className="body-text">{username}</p>
                    <p>Member</p>
                </div>
            </div>
            <Settings className="profile-box-icon"/>
        </div>
    </div>
    )
}

export function SearchBar(){
    return(
        <div className="searchbar-box">
            <Input placeholder="Search workout programs..." type="search" variant="search-workouts"/>
        </div>
    )
}