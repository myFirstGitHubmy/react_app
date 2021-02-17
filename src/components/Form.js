import React, {useState} from 'react'
import {RequestForm} from "./actions/RequestForm";
import {AssignForm} from "./actions/AssignForm";
import {ReportForm} from "./actions/ReportForm";

export const Form = () => {

    const [command, setCommand] = useState([{id_var:null, name:null, ident: null, status:false, id_program: 1}])

    const changeCommand = (comm) => {
        const res ={
            id: comm.id,
            name: comm.id,
            ident: comm.ident,
            status: true,
            id_program: comm.program_id
        }
        setCommand(res)
    }

    return (
        <form>
            <h1>system command</h1>
            <div className="form-group">
                <RequestForm onChange={changeCommand}/>
                <AssignForm />
                <ReportForm />
                <input type="text" className="form-control"/>
            </div>
        </form>
    )
}

