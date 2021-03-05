import React, {useContext, useState} from 'react'
import {RequestForm} from "./actions/RequestForm";
import {AssignForm} from "./actions/AssignForm";
import {ReportForm} from "./actions/ReportForm";
import {DatabaseContext} from "../context/database/databaseContext";
import {VariableList} from "./VariableList";
import {AlertContext} from "../context/alert/alertContext";
import {Alert} from "./Alert";

export const Form = () => {

    const databaseState = useContext(DatabaseContext)
    const alert = useContext(AlertContext)
    const [command, setCommand] = useState(databaseState.commands)
    const [variables, setVariables] = useState(databaseState.variables)

    const update = () => {
        alert.hide()
        databaseState.fetchVariables()
        console.log(databaseState.variables)
    }

    const changeCommand = () => {
        setCommand([...databaseState.commands])
        console.log(command)
    }

    const changeVariables = () => {
        setVariables([...databaseState.variables])
        console.log(variables)
    }

    const fetchCommand = () => {
        databaseState.fetchCommands()
            .catch(error => console.log(error.message))
        setCommand(databaseState.commands)
    }

    return (
        <div>
           <div>
                <VariableList array={variables}/>
           </div>

            <form>
                <h1>system command</h1>
                <Alert />
                <div className="form-group">
                    <RequestForm onClick={update} saveVar={changeVariables} saveCommand={changeCommand}/>
                    <AssignForm />
                    <ReportForm />
                    <input type="text"  className="form-control"/>
                </div>
                <button type="button" onClick={fetchCommand}>update</button>
                <div className="form-group">
                    {command.map(arr => <div key={arr.id}>{
                        arr.name
                    }</div>)}
                </div>
            </form>
        </div>
    )
}


