import React, {useContext, useState} from 'react'
import {RequestForm} from "./actions/RequestForm";
import {AssignForm} from "./actions/AssignForm";
import {ReportForm} from "./actions/ReportForm";
import {DatabaseContext} from "../context/database/databaseContext";
import {FormProgramList} from "./fieldProgram/FormProgramList";

export const Form = () => {

    const databaseState = useContext(DatabaseContext)

    const [command, setCommand] = useState([])
    const [variables, setVariables] = useState([])

    const update = () => {
        databaseState.fetchVariables()
        console.log(databaseState.variables)
    }

    const changeCommand = (comm) => {
        const count = command.length
        const res ={
            id: count,
            name: comm.name,
            ident: comm.ident,
            status: true
        }
        setCommand([...command,res])

        console.log(command)
    }

    const changeVariables = (variable) => {
        const count = variables.length
        // console.log(databaseState.variables)
        setVariables([...variables,{id:count, name: variable.name, value: variable.value}])
        console.log(variables)
    }

    const fetchCommand = () => {
        databaseState.fetchCommands()
            .catch(error => console.log(error.message))
        setCommand(databaseState.commands)
    }

    return (
        <form>
            <h1>system command</h1>
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
    )
}


