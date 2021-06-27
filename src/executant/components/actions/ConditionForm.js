import React, {useContext, useState} from "react";
import {DatabaseContext} from "../../../context/database/databaseContext";
import iconPlus from '../../../resources/plus.png'

export const ConditionForm = (props) => {
    const {addCommands, addVariables, fetchVariables, variables, fetchCommands} = useContext(DatabaseContext)
    const [value, setValue] = useState('')

    const saveCondition = () => {
        const obj_com = {
            name: 'Если '+ value,
            ident: 'CONDITION'
        }
        addCommands(obj_com)
        fetchCommands()

    }

    const add_var_condition = (event) => {
        const val = Array.from(event.target.selectedOptions, option => option.value)
        setValue(value+val)
        console.log(value)
    }


    return (
        <div>
            <button type="button" onClick={()=>fetchVariables()} className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCondition">
                Ветвление
            </button>
            <div className="modal fade" id="exampleModalCondition" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Условие</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="container">

                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={'Задайте условие'}
                                    onChange={e => setValue(e.target.value)}
                                    value={value}
                                />
                            </div>
                            <p>Переменные:</p>
                            <select className="custom-select" onChange={add_var_condition}>
                                {Object.keys(props.array).map(item => <option value={props.array[item].name} key={props.array[item].id}>
                                        {
                                            props.array[item].name
                                        }
                                    </option>
                                )}
                            </select>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                setValue('')
                                fetchCommands()
                            }} data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={saveCondition}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}