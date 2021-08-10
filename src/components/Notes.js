import React, {useContext, useEffect} from "react";
import deleteIcon from "../resources/delete-icon.png";
import ReactDom from 'react-dom'
import {DatabaseContext} from "../context/database/databaseContext";

// export class NotesClass extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             notes: []
//         }
//
//         this.updateNotes = this.updateNotes.bind(this)
//     }
//
//     updateNotes = () => {
//         const database = useContext(DatabaseContext)
//         this.setState({notes: database.commands})
//     }
//
//     render() {
//         return (
//             <div className="form-group" onTimeUpdate={this.updateNotes}>
//                 {Object.keys(this.state.notes).map(note => <div key={note.id}>
//                     {this.state.notes[note].name}
//                     <button className="delete-icon" type="button" /*onClick={() => onRemove(note.id)}8=*/><img alt="delete" src={deleteIcon} className="delete-icon"/></button></div>)}
//             </div>
//         )
//     }
// }

 export const Notes = () => {
     const {commands, fetchCommands, removeCommands} = useContext(DatabaseContext)
     useEffect(() => {
         fetchCommands()
     },[])

     let notes = commands

     return (<div className="form-group">
             <div>Начало</div>
        {Object.keys(notes).map(note => <div key={notes[note].id}>
            {notes[note].name}
            <img alt="delete" src={deleteIcon} className="icon" onClick={() => removeCommands(notes[note].id)}/>
                </div>)}
    </div>
)
}

ReactDom.render(
    Notes,
    document.getElementById('root')
)