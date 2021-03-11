import React, {useContext, useState} from 'react'
import {RequestForm} from "./actions/RequestForm";
import {AssignForm} from "./actions/AssignForm";
import {ReportForm} from "./actions/ReportForm";
import {DatabaseContext} from "../context/database/databaseContext";
import {VariableList} from "./VariableList";
import {AlertContext} from "../context/alert/alertContext";
import {Alert} from "./Alert";
import deleteIcon from "../resources/delete-icon.png"
import {Notes} from "./Notes";

export const Form = () => {

    const {commands,variables,  fetchCommands, removeVariables, fetchVariables} = useContext(DatabaseContext)
    const alert = useContext(AlertContext)
    // const fetch = () => {
    //     fetchCommands
    //         .catch(err => console.log(err.message))
    //     fetchVariables
    //         .catch(err => console.log(err.message))
    //     console.log(variables)
    //     setVariables(variables)
    // }

    return (
        <div>
           <div>
                <VariableList array={variables} onRemove={removeVariables}/>
           </div>

            <form>
                <h1>system command</h1>
                <Alert />
                <div className="form-group">
                    <RequestForm/>
                    <AssignForm />
                    <ReportForm array={variables}/>
                    <input type="text"  className="form-control"/>
                </div>
            <Notes notes={commands}/>
            </form>
        </div>
    )
}


