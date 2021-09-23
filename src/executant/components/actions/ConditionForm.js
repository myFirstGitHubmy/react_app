import React, {useContext, useState} from "react";
import {DatabaseContext} from "../../../context/database/databaseContext";
import iconPlus from '../../../resources/plus.png'

export const ConditionForm = (props) => {
    const {addCommands,condition, updateCondition, fetchVariables, commands, fetchCommands,lastIndex} = useContext(DatabaseContext)
    const [value, setValue] = useState('')
    let pos = 0

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
        const mas = val[0].split(' ')
        updateCondition({name: mas[0], value: mas[1], position: pos, id: lastIndex})
        setValue(value + mas[0])
        pos++;
        console.log(condition)
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
                                {Object.keys(commands).filter(fil => commands[fil].status === true).map(item => <option value={commands[item].nameVariable + ' '+ commands[item].id} key={commands[item].id}>
                                        {
                                            commands[item].nameVariable
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