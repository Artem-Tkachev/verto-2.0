import { useEffect, useState } from "react";
import './dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./UIComponents";
import { Dumbbell, Trophy, Waypoints } from "lucide-react";

function Dashboard(){
    const navigate = useNavigate();
    const [distance, setDistance] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [workoutsAmount, setWorkoutsAmount] = useState();
    const [username, setUsername] = useState("");



    useEffect(() => {
        async function loadDashboard() {
            const token = localStorage.getItem("token");
            const responce = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
                headers: {"Authorization": "Bearer " + token}
            });
            const data = await responce.json();
            if(!responce.ok){
                navigate("/login");
            }
            setDistance(data.distance_number);
            setUsername(data.username);
            setWorkouts(data.workouts);
            setWorkoutsAmount(data.workouts_number)
        }
        loadDashboard();
    }, []);

    return(
            <div className="main-dashboard">
                <div className="dashboard-header">
                    <p>WELCOME BACK</p>
                    <div>
                        <p className="text-h1-dashboard">Hello, {username}!</p>
                        <div className="dashboard-header-buttons">
                            <Link className="btn btn-secondary btn-dashboard" to={"/workouts/upload"}>
                                <p>Start Workout</p>
                            </Link>
                            <Link className="btn btn-primary-hole btn-dashboard" to={"/workouts"}>
                                <p>View Workouts</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="dashboard-statistic">
                    <div className="statistic-box">
                        <div className="statistic-icon-box">
                            <Dumbbell className="statistic-icon-blue"/>
                        </div>
                        <p className="dashboard-h1">{workoutsAmount}</p>
                        <p>TOTAL WORKOUTS</p>
                    </div>
                    <div className="statistic-box">
                        <div className="statistic-icon-box">
                            <Waypoints className="statistic-icon-blue"/>
                        </div>
                        <p className="dashboard-h1">{distance}</p>
                        <p>TOTAL KM</p>
                    </div>
                    <div className="statistic-box">
                        <div className="statistic-icon-box">
                            <Trophy className="statistic-icon-blue"/>
                        </div>
                        <p className="dashboard-h1">{workoutsAmount}</p>
                        <p>CHALLENGES WON</p>
                    </div>
                </div>
                <div className="dashboard-main-content">
                    <div className="recent-activities">
                        <div className="activities-header">
                            <p className="dashboard-h2">Recent Activity</p>
                            <Link className="link-text" to="/workouts">View All Activities</Link>
                        </div>
                        <div className="dashboard-workout-cards">
                            {workouts.map((workout) => (
                                <div key={workout.id} className="workout-card">
                                    <p className="workout-card-name">{workout.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="goal-progress">
                        <p className="dashboard-h2">Goal Progress</p>
                    </div>
                </div>
            </div>
    )
}

export default Dashboard;   