import { useState, useEffect } from "react"
import { Button, ButtonIcon, Input } from "./UIComponents"
import { useNavigate, Link } from "react-router";
import "./workouts.css"
import { Dumbbell, Zap, CircleCheck, Upload, LayoutGrid, List,  } from "lucide-react";


export function CreateWorkout(){
    const [workoutName, setWorkoutName] = useState();
    const [workoutType, setWorkoutType] = useState("");
    const [workoutDate, setWorkoutDate] = useState();
    const [workoutDistance, setWorkoutDistance] = useState();
    const [workoutDuration, setWorkoutDuration] = useState();
    const [message, setMessage] = useState();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    async function RegSubmit(e){
        e.preventDefault();
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({workoutName: workoutName, workoutType: workoutType, workoutDate: workoutDate, workoutDuration: workoutDuration, workoutDistance: workoutDistance})
        });

        const data = await response.json();
        console.log(data);
        if(response.ok){
            setMessage(data.message);
        }
        else{
            setMessage(data.error);
            navigate("/login");
        }
    }

    return(
        <div className="main-dashboard">
            <div className="header-text">
                <h1 className="text-h1">Log New <span className="text-italic">Perfomance</span> Session</h1>
            </div>
            <div className="workouts-form-block">
                <form className="workouts-form" onSubmit={RegSubmit}>
                    <div className="streak-block">
                        <Dumbbell className="streak-icon"/>
                        <p className="streak-text">Consistency is the bridge between goals and accomplishment.</p>
                        <div className="streak-bottom-block ">
                            <div className="streak-bottom-text">
                                <Zap className="streak-bottom-icon"/>
                                <p>CURRENT STREAK</p>
                            </div>
                            <div className="streak-bottom-days">
                                <p className="streak-days">12</p>
                                <p>Days</p>
                            </div>
                        </div>
                    </div>
                        <div className="workout-inputs">
                            <Input placeholder="Morning Recovery Run" type="text" variant="workout inp-group-name" label="Workout Name" onChange={(e) => setWorkoutName(e.target.value)} className="inp-name"/>
                            <div className="inp-group inp-group-workout">
                                <label className="inp-label">Type</label><br/>
                                <select className="inp inp-select inp-workout" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                                    <option>Running</option>
                                    <option>Walking</option>
                                    <option>Cycling</option>
                                    <option>Swimming</option>
                                    <option>Hiking</option>
                                    <option>Strength Training</option>
                                    <option>Yoga</option>
                                    <option>HIIT</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <Input label="Date" type="Date" variant="workout" onChange={(e) => setWorkoutDate(e.target.value)} />
                            <Input label="Distance (km)" placeholder="5.0" type="number" variant="workout" onChange={(e) => setWorkoutDistance(e.target.value)}/>
                            <Input label="Duration (hh:mm)" placeholder="00:45" type="time" variant="workout" onChange={(e) => setWorkoutDuration(e.target.value)}/>
                        
                        <div className="bottom-btn">
                            <input type="reset" className="body-text" value="Discard"/>
                            <Input type="submit" variant="submit" icon={CircleCheck} value="Save Workout"/>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <p className="error-text">{message}</p>
            </div>
        </div>
    )
}

export function Workouts(){
    const [workouts, setWorkouts] = useState([]);
    const navigate = useNavigate();
    const [period, setPeriod] = useState(30);
    const [workoutType, setWorkoutType] = useState();
    const [distance, setDistance] = useState();
    

    useEffect(() => {
        async function fetchWorkouts() {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts/mine`, {
                headers: { "Authorization": "Bearer " + token}
            });
            const data = await response.json();
            if (!response.ok){
                navigate("/login");
            }
            setWorkouts(data.workouts);
            setDistance(data.distance);
        }
        fetchWorkouts();
    }, []);


    return(
        <div className="main-dashboard">
            <div className="header-dashboard">
                <div className="header-text">
                    <h1 className="text-h1">My workouts</h1>
                </div>
                <Link to="/workouts/upload" className="btn-upload">
                    <Upload className="btn-upload-icon"/>
                    <p>Upload workout</p>
                </Link>
            </div>
            <div className="statistic-block">
                <div className="statistic-falldown-block">
                    <div className="statistic-falldowns">
                        <div className="statistic-falldown">
                            <p className="statistic-header inp-label">Period</p>
                            <select className="inp-select inp-period" value={period} onChange={(e) => setPeriod(e.target.value)}>   
                                <option value={3}>Last 3 days</option>
                                <option value={10}>Last 10 days</option>
                                <option value={30}>Last 30 days</option>
                                <option value={0}>All period</option>
                            </select>
                        </div>
                        <div className="statistic-falldown">
                            <p className="statistic-header inp-label">Activity Type</p>
                            <select className="inp-select inp-period" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                                <option value="0">All types</option>
                                <option>Running</option>
                                <option>Walking</option>
                                <option>Cycling</option>
                                <option>Swimming</option>
                                <option>Hiking</option>
                                <option>Strength Training</option>
                                <option>Yoga</option>
                                <option>HIIT</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="statistic-icons">
                        <div className="dashboard-statistic-icon-box"><LayoutGrid className="statistic-icon"/></div>
                        <div className="dashboard-statistic-icon-box"><List className="statistic-icon"/></div>
                    </div>
                </div>
                
                <div className="distance-box">
                    <p className="distance-header">Total for week</p>
                    <p className="distance-box-amount"><span className="dashboard-h2     dashboard-distance">{distance}</span> KM</p>
                </div>
            </div>

            <div className="workout-cards">
                {workouts.map((workout) => (
                    <div key={workout.id} className="workout-card">
                        <div className="workout-card-name-block">
                            <p className="workout-card-name">{workout.title}</p>
                            <p className="workout-card-type">{workout.type}</p>
                        </div>
                        <p className="workout-card-date">{workout.date}</p>
                        <p className="workout-card-distance">{workout.distance}</p>
                        <p className="workout-card-duration">{workout.duration}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}