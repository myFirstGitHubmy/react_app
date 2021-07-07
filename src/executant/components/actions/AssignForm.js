import React, {useContext, useEffect, useState} from "react";
import {DatabaseContext} from "../../../context/database/databaseContext";
import {AlertContext} from "../../../context/alert/alertContext";
import {ASSIGN} from "../../../context/identTypes"

export const AssignForm = () => {
    const {commands, addCommands,updateVariable,fetchCommands,addVariable,fetchVariables,lastIndex} = useContext(DatabaseContext)
    const alert = useContext(AlertContext)
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [status, setStatus] = useState(false)

    useEffect(()=>{
        fetchCommands()
    },[])

    const saveVariable = () => {
        const obj = {
            name: 'Запросить '+ name + ' и присвоить значение ' + value,
            ident: ASSIGN,
            status: true,
            nameVariable: name,
            valueVariable: value
        }
        addCommands(obj)
        alert.show('Запросить ' + name + 'со значением '+value+' добавлена','success')
    }

    const clear = () => {
        setValue('')
        setName('')
        setStatus(false)
    }

    const onToggleChange = () => {
        if (!name){
            alert.show('Введите наименование переменной')
        }else {
            setStatus(!status)
            if (status) {
                setValue('')
            }
        }
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLongAssign">
                Запросить ... присвоить ...
            </button>
            <div className="modal fade" id="exampleModalLongAssign" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Запросить ... присвоить ...</h5>
                            <button type="button" className="close" data-dismiss="modal" onClick={clear} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="container">
                            {!status?
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={'Наименование переменной'}
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>:
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={'Значение переменной'}
                                    onChange={e => setValue(e.target.value)}
                                    value={value}
                                />
                            </div>}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                setValue('')
                                setName('')
                            }} data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-primary" onClick={onToggleChange}>{!status? 'Далее': 'Назад'}</button>
                            <button type="button" className="btn btn-primary" disabled={!status} data-dismiss={`${alert.type = 'success'?"modal":null}`} onClick={()=> {
                                saveVariable()
                                clear()
                            }}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
