import React, {useContext, useState} from "react";
import {DatabaseContext} from "../../context/database/databaseContext";
import {AlertContext} from "../../context/alert/alertContext";
import {Alert} from "../Alert";

export const AssignForm = () => {
    const database = useContext(DatabaseContext)
    const alert = useContext(AlertContext)
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [status, setStatus] = useState(false)

    const saveVariable = () => {
        database.addVariable(name, value)
        alert.show('Переменная с именем ' + name + ' добавлена','success')
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
                Запросить и присвоить
            </button>
            <div className="modal fade" id="exampleModalLongAssign" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Запросить и присвоить</h5>
                            <button type="button" className="close" data-dismiss="modal" onClick={clear} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="container">
                            <Alert/>
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
                            <button type="button" className="btn btn-primary" disabled={!status} data-dismiss={status? "modal":null} onClick={()=> {
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