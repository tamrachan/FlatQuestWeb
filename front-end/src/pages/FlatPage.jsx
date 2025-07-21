import "../css/FlatPage.css"

function FlatPage() {

    return <>
        <div>
        <h1>FlatPage!</h1>
        </div>

        
        <div className="taskBox">
        <h3>Tasks</h3>
        checkboxy stuff?
        </div>

        <div> 

            <h3>Characters</h3>

            <div className="characters">

            <Character />
            
{/* circle n name */}

            </div>

            
        </div>
    </>
}

// function tasksBox() {

//     return <div className="taskBox">
//         <h2>Tasks</h2>
//     </div>

// }

function Character() {
    return <div className="characterIcon">
        name name#
        image icon - standard circle
    </div>
}

export default FlatPage;