import React, {useContext, useState} from "react";
import {DatabaseContext} from "../../context/database/databaseContext";
import ReactDom from 'react-dom'
import {RequestForm} from "./RequestForm";

export const ReportForm = (props) => {

    const database = useContext(DatabaseContext)
    const [selectedOption, setSelectedOption] = useState([])

    const saveVariable = () => {
        const obj = {
            name: 'Сообщить '+ selectedOption ,
            ident: 'ASSIGN'
        }
        database.addCommands(obj)
        database.fetchVariables()
        database.fetchCommands()
    }

    const fetch = () => {
        database.fetchVariables()
        database.fetchCommands()
        console.log(database.variables)
    }

    const handleChangeReport = (event) => {
        const val = Array.from(event.target.selectedOptions, option => option.value)
        setSelectedOption(val)
        console.log(selectedOption)
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
                            <div className="modal-body">
                                <select className="custom-select" onChange={handleChangeReport}>
                                    {Object.keys(props.array).map(item => <option value={props.array[item].name} key={props.array[item].id}>
                                            {
                                                props.array[item].name
                                            }
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                setSelectedOption('')
                                database.fetchCommands()
                            }} data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-primary" onClick={saveVariable}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ReactDom.render(
    RequestForm,
    document.getElementById('root')
)