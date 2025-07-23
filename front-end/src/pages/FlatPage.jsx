import "../css/FlatPage.css"

function FlatPage() {

    return <>

        <div className="title">
        <h1>FlatPage!</h1>
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

                <h3>Personal Tasks</h3>
                <div>personal stuff like do hw</div> {/* ig u should be able to add this so... */}

                <form action="{addPersonalTask}"> {/* it should be a method that adds it to the tasks data base in another personal database collection */}
                    <input type="text" placeholder="Add personal tasks here..." name="personalTask" className="inputText" />
                    <button type="submit" />
                </form> 

            </div>

        </div>

        <div> 

            <h3>Characters</h3>

            <div className="characters">

            <Character name={"Hanaa"} imageSrc={"/icons/red_beach_ball.xcf"} /> {/* i thought to test it, but the pic no work */}
            <Character name={"Tamra"} imageSrc={""} />

            {/* i wanna do some sort of loop that loops through ppl in the flat, n does it with whoever the current person is as the first name, then 
            alphabetical, but i do not know how to do that conditonal html yet... */}            


            </div>

            
        </div>
    </>
}

// function tasksBox() {

//     return <div className="taskBox">
//         <h2>Tasks</h2>
//     </div>

// }

function Character({ name, imageSrc }) {
    return <div className="characterIcon">
        
        <img src={imageSrc} alt="Avatar"></img>
        <figcaption> {name} </figcaption>
        {/* <label>name</label> */}

    </div>
}

export default FlatPage;