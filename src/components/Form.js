import React, {useContext, useState} from 'react'
import {RequestForm} from "./actions/RequestForm";
import {AssignForm} from "./actions/AssignForm";
import {ReportForm} from "./actions/ReportForm";
import {DatabaseContext} from "../context/database/databaseContext";
import {VariableList} from "./VariableList";
import {AlertContext} from "../context/alert/alertContext";
import {Alert} from "./Alert";
import {Notes} from "./Notes";
import {ConditionForm} from "./actions/ConditionForm";

export const Form = () => {

    const {commands,variables,  fetchCommands, removeVariables, fetchVariables,addCommands} = useContext(DatabaseContext)
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
                </div>
                <div>
                    <div><ConditionForm array={variables}/></div>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            addCommands({name: 'То', ident: 'THEN'})
                            fetchCommands()
                        }}>
                            То
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={
                            () => {
                                addCommands({name: 'Иначе', ident: 'ELSE'})
                                fetchCommands()
                            }}>
                            Иначе
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={
                            () => {
                                addCommands({name: 'Конец ветвления', ident: 'END_CONDITION'})
                                fetchCommands()
                            }}>
                            Конец ветвления
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={
                            () => {
                                addCommands({name: 'Конец', ident: 'END'})
                                fetchCommands()
                            }}>
                            Конец
                        </button>
                    </div>
                </div>
            <Notes notes={commands}/>
            </form>
        </div>
    )
}


