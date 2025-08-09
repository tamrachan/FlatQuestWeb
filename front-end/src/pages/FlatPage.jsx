import "../css/FlatPage.css"
import ProgressBar from "../components/ProgressBar";
import redBeachBall from '../icons/red_beach_ball.png';

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../components/AuthRoute";
import { FaChevronDown } from "react-icons/fa";

import { ConfirmPopup, confirmPopup  } from 'primereact/confirmpopup'; 
import { Toast } from 'primereact/toast';

function FlatPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // Fetch fresh user data instead of using JWT payload
        api.get('/reset/me')
            .then(res => {
                setUser(res.data.user); // Fresh data from database
            })
            .catch(err => {
                console.error("Failed to fetch user data:", err);
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, []);


    const addMainTask = (e) => {
        e.preventDefault();
        const taskValue = e.target.mainTask.value;
        
        if (taskValue !== "") {

            console.log("Adding main task:", taskValue, "for user:", user?.user);

            axios.post('http://localhost:5050/task/new-task', 
                {task: taskValue, code: user?.code, publisher: user?.user, assigned: "todo", date_created: new Date(), complete: false, repeat: "todo"}) // change repeat
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

        console.log("Adding personal task:", taskValue, "for user:", user?.user);


            axios.post('http://localhost:5050/task/new-personal-task', 
                {task: taskValue, user: user?.user, date_created: new Date(), complete: false, repeat: "none"}) // change repeat
                .then(navigate(0)) // Reloads the current route
                .catch(err => {
                    console.error("Error adding personal task:", err);
                })
        }
    }
    
    return <>
        <div className="title">
            <h1>{user?.user}'s FlatPage!</h1>
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
                <DisplayTaskLog user={user} />
            </div>

            <div className="personalTasks">

                <h3 className="sticky">Personal Tasks</h3>
                <div className="taskList">
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
        .catch(error => {
            console.error("Error fetching tasks:", error);
        });
    }, []);

    const results = [];

    // console.log("user", user);

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
    const [tasks, setTasks] = useState([]);
    
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const [complete, setComplete] = useState(false);
    // const checkBoxButton = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:5050/task/get-personal-tasks')
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => {
            console.error("Error fetching tasks:", error);
        });
    }, []);

    const results = [];

    function handleChange(e) {
        const isChecked = e.target.checked;

        // // then ask for confirmation, if yes, post this
        axios.post("http://localhost:5050/task/complete-task", {
            complete: isChecked, collectionName: "personal-tasks"})
            .then(navigate(0))
            .catch(error => {
                console.error("Error: ", error);
        });

        console.log("Checked:", isChecked);

    }

    // const accept = () => {
    //     toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have checked of a task!', life: 3000 });

    //     axios.post("http://localhost:5050/task/complete-task", {
    //         complete: isChecked, collectionName: "personal-tasks",  })
    //         .then(navigate(0))
    //         .catch(error => {
    //             console.error("Error: ", error);
    //     });

    // };

    // const cancel = () => {
    //     setVisible(false);
    //     navigate(0);
    // };

    for (const task of tasks) {
        if ( (! tasks.complete) && (task.user === user?.user) ) {
            console.log("user", user?.user, task.user);

            results.push(

                <div>
                
                    <Toast ref={toast} /> 
                    <ConfirmPopup className="confirmPopup" //target={checkBoxButton.current} // position of the popup
                        visible={visible} 
                        onHide={() => setVisible(false)} // what happens when user closes popup 
                        message="Are you sure you want to proceed?" accept={() => setComplete(!complete)} //reject={cancel} 
                        />
                    <input type="checkbox" onChange={() => setVisible(true)} />{task.task}
                    {/* make it go in middle of screen */}
                
                </div>
            )
        }
    }

    return <div>{results}</div>;
}

// not tested
function DisplayTaskLog({ user }) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:5050/task/get-personal-tasks'),
            axios.get('http://localhost:5050/task/get-tasks')
        ])
        .then(([personalResponse, mainResponse]) => {
            setTasks([...personalResponse.data, ...mainResponse.data]);
        })
        .catch(error => {
            console.error("Error fetching task logs:", error);
        });

    }, []);

    const results = [];

    for (const task of tasks) {
        // (tasks.complete) && 
        if ( ((task.user === user?.user) || (task.code === user?.code)) ) { // only show tasks that are complete and belong to the user's group code or personal tasks
            console.log("task log", user?.user, task.user);

            //checked={task.complete}
            results.push(
                <div>

                     {task.task}

                </div>
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