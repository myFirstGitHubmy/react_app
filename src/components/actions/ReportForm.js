import React, {useContext, useState} from "react";
import {Alert} from "../Alert";
import {VariableList} from "../VariableList";
import {DatabaseContext} from "../../context/database/databaseContext";

export const ReportForm = () => {

    const database = useContext(DatabaseContext)
    const [value, setValue] = useState([])
    const [array, setArray] = useState([])

    const saveVariable = () => {

    }

    const fetch = () => {
        database.fetchVariable()
        setArray(database.variables)
        console.log(database.variables)

    }

    const handleChangeReport = (event) => {
        const val = Array.from(event.target.selectedOptions, option => option.value)
        setValue(val)
    }

    return (
        <div>
            <button type="button" onClick={fetch} className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLongReport">
                Сообщить
            </button>
            <div className="modal fade" id="exampleModalLongReport" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Сообщить</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="container">
                            <Alert/>
                            <div className="modal-body">
                                <VariableList array={array} handleChange={handleChangeReport}/>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setValue('')} data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-primary" onClick={saveVariable}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}