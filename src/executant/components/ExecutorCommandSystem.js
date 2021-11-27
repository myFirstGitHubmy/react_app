import React, {useContext} from "react";
import {Alert} from "../../components/Alert";
import {RequestForm} from "./actions/RequestForm";
import {AssignForm} from "./actions/AssignForm";
import {ReportForm} from "./actions/ReportForm";
import {DatabaseContext} from "../../context/database/databaseContext";
import {STOP} from "../../context/identTypes"

export const ExecutorCommandSystem = () => {
    const {commands,  fetchCommands,addCommands} = useContext(DatabaseContext)

    return (
        <div>
            <h2><span className="badge badge-secondary form-margin-left">Система команд исполнителя</span></h2>

            <div className="form-group">
                <Alert />
            </div>

            <div className="form-group div-border-ex form-margin-left">
                <div className="div-margin-3 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                    <RequestForm/>
                    <AssignForm />
                    <ReportForm/>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={
                            () => {
                                addCommands({name: 'Стоп', ident: STOP})
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