import React, {useContext, useState} from 'react'
import {RequestForm} from "./actions/RequestForm";
import {AssignForm} from "./actions/AssignForm";
import {ReportForm} from "./actions/ReportForm";
import {DatabaseContext} from "../context/database/databaseContext";

export const Form = () => {

    const databaseState = useContext(DatabaseContext)

    const [command, setCommand] = useState([])
    const [variables, setVariables] = useState([])

    const update = () => {
        databaseState.fetchVariables()
        console.log(databaseState.variables)
    }

    const changeCommand = (comm) => {
        const res ={
            id: comm.id,
            name: comm.id,
            ident: comm.ident,
            status: true
        }
        setCommand([...command,res])
    }

    const changeVariables = (variable) => {
        const count = variables.length
        console.log(databaseState.variables)
        setVariables([...variables,{id:count, name: variable.name, value: variable.value}])

    }

    return (
        <form>
            <h1>system command</h1>
            <div className="form-group">
                <RequestForm onClick={update} saveVar={changeVariables} onChange={changeCommand}/>
                <AssignForm />
                <ReportForm />
                <input type="text" className="form-control"/>
            </div>
        </form>
    )
}

