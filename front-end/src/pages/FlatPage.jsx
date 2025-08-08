import "../css/FlatPage.css"
import ProgressBar from "../components/ProgressBar";
import redBeachBall from '../icons/red_beach_ball.png';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { FaChevronDown } from "react-icons/fa";

function FlatPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You are not logged in");
            navigate("/login");  // redirect to login page
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } catch {
            alert("Invalid token");
            localStorage.removeItem("token");
            navigate("/login");
        return;
        }

        // Optional: fetch protected data
        axios.get("http://localhost:5050/record/protected", {
        headers: {
            Authorization: `Bearer ${token}`
        }
        }).then(res => {
        console.log("Protected data:", res.data);
        }).catch(err => {
            console.error("Token expired or invalid:", err);
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            navigate("/login");
        });
    }, []);

    const addMainTask = (e) => {
        e.preventDefault();
        const taskValue = e.target.mainTask.value;
        
        if (taskValue !== "") {

            console.log("Adding main task:", taskValue, "for user:", user?.username);

            axios.post('http://localhost:5050/task/new-task', 
                {task: taskValue, code: user?.code, publisher: user?.username, assigned: "todo", date_created: new Date(), complete: false, repeat: "todo"}) // change repeat
                .then(navigate(0)) // Reloads the current route
                .catch(err => {
                    console.error("Error adding personal task:", err);
                })
        }
    }

    const addPersonalTask = (e) => {
        e.preventDefault();
        const taskValue = e.target.personalTask.value;

        if (taskValue !== "") {

        console.log("Adding personal task:", taskValue, "for user:", user?.username);


            axios.post('http://localhost:5050/task/new-personal-task', 
                {task: taskValue, user: user?.username, date_created: new Date(), complete: false, repeat: "none"}) // change repeat
                .then(navigate(0)) // Reloads the current route
                .catch(err => {
                    console.error("Error adding personal task:", err);
                })
        }
    }
    
    return <>
        <div className="title">
            <h1>{user?.username}'s FlatPage!</h1>
            <p>Group Code: {user?.code}</p>
        </div>

        <div className="gridContainer">

            <div className="taskBox">
                <h3 className="sticky">Tasks</h3>
                <div className="taskList">

                    <DisplayMainTasks user={user} /> 
                    {/* <input type="checkbox" value="Take out rubbish"></input> maybe an onclick button would be better...  its gotta not be harcoded */}

                </div>
            </div>
            <div className="addMainTask">
                <form onSubmit={addMainTask}> 
                    <input type="text" placeholder="Add main tasks here..." name="mainTask" className="inputText" />
                    <button type="submit">Add</button>
                </form> 
            </div>

            <div className="taskLog">
                <h3>Task Log</h3>
                <div>stuff thats been done</div>
                <div>blah blha</div>
            </div>

            <div className="personalTasks">

                <h3 className="sticky">Personal Tasks</h3>
                <div className="taskList">
                    {/* <form onSubmit={addPersonalTask}> 
                        <label className="taskList">
                            <input type="checkbox" name="taskDone" />
                            Personal things to do
                        </label>
                    </form>  */}
                    <DisplayPersonalTasks user={user} />
                </div>

            </div>
            <div className="addTask">
                <form onSubmit={addPersonalTask}> {/* it should be a method that adds it to the tasks data base in another personal database collection */}
                    <input type="text" placeholder="Add personal tasks here..." name="personalTask" className="inputText" />
                    {/* <Dropdown /> */}
                    <button type="submit">Add</button>
                </form> 
            </div>

            <div className="stats">

                <h3>Stats</h3>
                <div>Tasks to do: (number)</div>
                <div>Tasks completed: (number)</div>

            </div>

            <div className="graph">

                <h3>Progress</h3>
                <div>A visual of how many left to do / total for the week</div>
                <ProgressBar progress={50} label="Completed tasks / Total tasks" color="#2196f3" /> {/* Pass in percentage of tasks calculated */}

            </div>

            <div className="flatmate-section"> 

                <h3>Flatmates</h3>

                <div className="flatmates">

                <Flatmate name={"Hanaa"} imageSrc={redBeachBall} />
                <Flatmate name={"Yi Xin"} imageSrc={redBeachBall} />
                <Flatmate name={"Thy"} imageSrc={redBeachBall} />
                <Flatmate name={"Freya"} imageSrc={redBeachBall} />
                <Flatmate name={"Zoya"} imageSrc={redBeachBall} />

                {/* i wanna do some sort of loop that loops through ppl in the flat, n does it with whoever the current person is as the first name, then 
                alphabetical, but i do not know how to do that conditonal html yet... */}            


            </div>

            
        </div>

        </div>

    </>
}

// function tasksBox() {

//     return <div className="taskBox">
//         <h2>Tasks</h2>
//     </div>

// }

function DisplayMainTasks({ user }) {
    // const { user } = useContext(UserContext); // could put this as a prop instead
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5050/task/get-tasks')
        .then(response => {
            setTasks(response.data);
        })
    }, []);

    const results = [];

    console.log("user", user);

    for (const task of tasks) {
        if ( (! tasks.complete) && (task.code === user?.code) ) { // only show tasks that are not complete and belong to the user's group code

            console.log("tasks", task);

            results.push(
                <div>{task.assigned}: {task.task}</div>
            )
        }
    }

    return <div>{results}</div>;
}

function DisplayPersonalTasks({ user }) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5050/task/get-personal-tasks')
        .then(response => {
            setTasks(response.data);
        })
    }, []);

    const results = [];

    // console.log(tasks.user)
    // console.log("props.user", props.user);

    for (const task of tasks) {
        if ( (! tasks.complete) && (task.user === user?.username) ) {
            console.log("user", user?.username, task.user);

            results.push(
                <div>{task.task}</div>
            )
        }
    }

    return <div>{results}</div>;
}

// TODO
function Dropdown() {
    const [ display, setDisplay ] = useState( 'none' )

    function handleClick() {
        if ( display == 'none' ) {
            setDisplay( 'block' )
        } else {
            setDisplay( 'none' )
        }
    }

    return (
        <>
        <div className="dropdown-btn">Repeat<span className="toggle-icon"><FaChevronDown /></span></div> {/* dropdown button */}
        <div className="dropdown-content">content</div> {/* dropdown content */}

        {/* <div className="dropdown">
            <button className="dropbtn">Repeat</button>
            <div className="dropdown-content">
                <a href="#">Daily</a>
                <a href="#">Weekly</a>
                <a href="#">Monthly</a>
                <a href="#">Yearly</a>
                <a href="#">Custom</a>
            </div>
        </div> */}
        </>
    );
}

function Flatmate({ name, imageSrc }) {
    return <div className="flatmate-icon">
        
        <img src={imageSrc} alt="Avatar"></img>
        <figcaption> {name} </figcaption>
        {/* <label>name</label> */}

    </div>
}

export default FlatPage;