import Dashboard from "./dashboard"
import "./Slidebar.css"
import { Input, Li } from "./UIComponents"
import { LayoutDashboard, CircleUser, Dumbbell, CirclePlus, UserSearch, Trophy, Settings } from "lucide-react"
import Verto_logo from "./assets/Verto_logo.svg";

export function Slidebar(){
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
                <Li icon={Trophy} text="Challenges" link="/challenges"/>
                <Li icon={CircleUser} text="Profile" link="/profile" end={true}/>
            </ul>
        </div>
        <div className="profile-box">
            <div className="profile-picture">
                <img/>
            </div>
            <div className="profile-name-text">
                <p className="body-text">Name Surname</p>
                <p>Member</p>
            </div>
            <Settings/>
        </div>
    </div>
    )
}

export function SearchBar(){
    return(
        <div>
            <Input placeholder="Search workout programs..." type="search" variant="search-workouts"/>
        </div>
    )
}