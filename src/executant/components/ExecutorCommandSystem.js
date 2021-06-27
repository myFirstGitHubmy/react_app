import React, {useContext} from "react";
import {Alert} from "../../components/Alert";
import {RequestForm} from "./actions/RequestForm";
import {AssignForm} from "./actions/AssignForm";
import {ReportForm} from "./actions/ReportForm";
import {DatabaseContext} from "../../context/database/databaseContext";

export const ExecutorCommandSystem = () => {
    const {variables,  fetchCommands, removeVariables, fetchVariables,addCommands} = useContext(DatabaseContext)

    return (
        <div>
            <h2><span className="badge badge-secondary form-margin-left">Система команд исполнителя</span></h2>

            <div className="form-group">
                <Alert />
            </div>

            <div className="form-group div-border form-margin-left">
                <div className="div-margin-3 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                    <RequestForm/>
                    <AssignForm />
                    <ReportForm array={variables}/>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={
                            () => {
                                addCommands({name: 'Стоп', ident: 'Stop'})
                                fetchCommands()
                            }}>
                            Стоп
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}