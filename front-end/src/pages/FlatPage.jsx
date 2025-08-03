import "../css/FlatPage.css"
import ProgressBar from "../components/ProgressBar";
import redBeachBall from '../icons/red_beach_ball.png';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../components/UserContext";

function FlatPage() {
    const { user } = useContext(UserContext);
    const userData = localStorage.getItem("userData"); 
    const navigate = useNavigate();
    console.log("User in FlatPage:", user);

    // If user is not defined, send back to login page
    useEffect(() => {
    if (!userData) {
        navigate('/login');
        }
    }, [user, navigate]);
    
    return <>
        <div className="title">
            <h1>{user?.user}'s FlatPage!</h1>
            <p>Group Code: {user?.code}</p>
        </div>

        <div className="gridContainer">

            <div className="taskBox">
                <h3>Tasks</h3>
                <input type="checkbox" value="Take out rubbish"></input> {/* maybe an onclick button would be better...  its gotta not be harcoded*/}
            </div>

            <div className="taskLog">
                <h3>Task Log</h3>
                <div>stuff thats been done</div>
                <div>blah blha</div>
            </div>

            <div className="personalTasks">

                <h3 className="sticky">Personal Tasks</h3>
                <div className="taskList">
                    <form action="{addPersonalTask}"> {/* it should be a method that adds it to the tasks data base in another personal database collection */}
                        <label className="taskList">
                            <input type="checkbox" name="taskDone" />
                            Personal things to do
                        </label>
                    </form> 
                    <form action="{addPersonalTask}"> {/* it should be a method that adds it to the tasks data base in another personal database collection */}
                        <label className="taskList">
                            <input type="checkbox" name="taskDone" />
                            Personal things to do
                        </label>
                    </form> 
                    <form action="{addPersonalTask}"> {/* it should be a method that adds it to the tasks data base in another personal database collection */}
                        <label className="taskList">
                            <input type="checkbox" name="taskDone" />
                            Personal things to do
                        </label>
                    </form> 
                    <form action="{addPersonalTask}"> {/* it should be a method that adds it to the tasks data base in another personal database collection */}
                        <label className="taskList">
                            <input type="checkbox" name="taskDone" />
                            Personal things to do
                        </label>
                    </form> 
                    <form action="{addPersonalTask}"> {/* it should be a method that adds it to the tasks data base in another personal database collection */}
                        <label className="taskList">
                            <input type="checkbox" name="taskDone" />
                            Personal things to do
                        </label>
                    </form> 
                    <form action="{addPersonalTask}"> {/* it should be a method that adds it to the tasks data base in another personal database collection */}
                        <label className="taskList">
                            <input type="checkbox" name="taskDone" />
                            Personal things to do
                        </label>
                    </form> 
                    <form action="{addPersonalTask}"> {/* it should be a method that adds it to the tasks data base in another personal database collection */}
                        <label className="taskList">
                            <input type="checkbox" name="taskDone" />
                            Personal things to do
                        </label>
                    </form> 
                </div>


            </div>
            <div className="addTask">
                <form action="{addPersonalTask}"> {/* it should be a method that adds it to the tasks data base in another personal database collection */}
                    <input type="text" placeholder="Add personal tasks here..." name="personalTask" className="inputText" />
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

function Flatmate({ name, imageSrc }) {
    return <div className="flatmate-icon">
        
        <img src={imageSrc} alt="Avatar"></img>
        <figcaption> {name} </figcaption>
        {/* <label>name</label> */}

    </div>
}

export default FlatPage;