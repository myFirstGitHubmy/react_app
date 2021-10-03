import React, {useContext, useState,useEffect} from "react";
import {AlertContext} from "../../../context/alert/alertContext";
import {DatabaseContext} from "../../../context/database/databaseContext";
import {REQ} from "../../../context/identTypes"

export const RequestForm = () => {

    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)
    const {variables,commands, addCommands,fetchCommands,addVariable,fetchVariables,lastIndex} = useContext(DatabaseContext)

    useEffect(()=>{
        fetchVariables()
            .then(() => console.log(variables.json))
    },[])

    const saveVariable = () => {
        let checkRepeatVar = false
        if (commands !== null){
            Object.keys(commands).map(item=> {
                console.log('request form. Value: '+ value)
                console.log('request form. nameVariable: '+ commands[item].nameVariable)
                if (commands[item].nameVariable.toLowerCase() === value.toLowerCase()){
                    checkRepeatVar = true
                }
            })
        }
        if (checkRepeatVar){
            alert.show('Переменная ' + value + ' уже существует', 'warning')
        }else {
            if (value.trim()) {
                const com = {
                    name: 'Запросить ' + value,
                    ident: REQ,
                    status: true,
                    nameVariable: value.toLowerCase(),
                    valueVariable: null
                }
                addCommands(com)
                    .then(res => console.log("res: "+ res))
                fetchCommands()
                    .then(() => console.log("update commands"))
                console.log('lastIndex: '+ lastIndex)
                    alert.show('Переменная ' + value + ' создана', 'success')
                    fetchVariables()
            } else {
                alert.show('Введите название переменной')
            }
        }
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                Запросить ...
            </button>
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Запросить ...</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                            <div className="container">
                                <div className="modal-body">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={'Запросить переменную'}
                                        onChange={e => setValue(e.target.value)}
                                        value={value}
                                    />
                                </div>
                            </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setValue('')} data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={saveVariable}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}