import React, {useContext, useState} from "react";
import {DatabaseContext} from "../../../context/database/databaseContext";
import iconPlus from '../../../resources/plus.png'
import {REQ, ASSIGN} from "../../../context/identTypes"

export const ConditionForm = ({toggleCondition}) => {
    const {addCommands,condition, fetchVariables, commands, fetchCommands,lastIndex,addCondition,fetchCondition} = useContext(DatabaseContext)
    const [value, setValue] = useState('')

    const saveCondition = () => {
        const obj_com = {
            name: 'Если '+ value,
            ident: 'CONDITION',
            status: true
        }
        addCommands(obj_com)
        fetchCommands()
        fetchCondition()
        toggleCondition()
    }

    const add_var_condition = (event) => {
        const val = Array.from(event.target.selectedOptions, option => option.value)
        const mas = val[0].split(' ')
        addCondition({name: mas[0], value: mas[1], command_id: lastIndex+1})
        setValue(value + mas[0])
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
                                {Object.keys(commands)
                                    .filter(fil => commands[fil].status === true &&
                                        (commands[fil].ident === REQ || commands[fil].ident === ASSIGN))
                                    .map(item =>
                                        <option
                                            value={commands[item].nameVariable + ' '+ commands[item].id}
                                            key={commands[item].id}>
                                            {commands[item].nameVariable}
                                    </option>
                                )}
                            </select>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                setValue('')
                                fetchCommands()
                            }} data-dismiss="modal">Отмена</button>
                            <button type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    onClick={saveCondition}
                            >
                                Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}