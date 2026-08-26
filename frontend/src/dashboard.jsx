import { useEffect, useState } from "react";
import './dashboard.css';
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();
    const [distance, setDistance] = useState();
    const [workouts, setWorkouts] = useState([]);
    const [workoutsAmount, setWorkoutsAmount] = useState();
    const [username, setUsername] = useState("");



    useEffect(() => {
        async function loadDashboard() {
            const token = localStorage.getItem("token");
            const responce = await fetch("http://localhost:5000/api/dashboard", {
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
                <p>{username}</p>
            </div>
    )
}

export default Dashboard;   