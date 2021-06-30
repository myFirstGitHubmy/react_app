import React, {useContext, useState,useEffect} from "react";
import {AlertContext} from "../../../context/alert/alertContext";
import {DatabaseContext} from "../../../context/database/databaseContext";

export const RequestForm = () => {

    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)
    const {variables,commands, addCommands,fetchCommands,addVariable,fetchVariables} = useContext(DatabaseContext)

    useEffect(()=>{
        fetchVariables()
            .then(() => console.log(variables.json))
    },[])

    const saveVariable = () => {
        const arr = variables
        let checkRepeatVar = false
        Object.keys(arr).map(item=> {
            if (arr[item].name.toLowerCase() === value.toLowerCase()){
                checkRepeatVar = true
            }
        })
        if (checkRepeatVar){
            alert.show('Переменная ' + value + ' уже существует', 'warning')
        }else {
            if (value.trim()) {
                const com = {
                    name: 'Запросить ' + value,
                    ident: 'REQ',
                    status: true
                }
                addCommands(com)
                    .then(res => console.log("res: "+ res))
                fetchCommands()
                    .then(() => console.log("update commands"))
                setValue('')
                let lastCom = null
                Object.keys(commands).map(item => {
                    lastCom = commands[item].id
                })
                console.log("comm: "+lastCom)
                const varObject = {name: value, value: null,commands:lastCom+1}
                try {
                    addVariable(varObject)
                        .catch(err => {
                            console.log(err.message)
                        })
                    alert.show('Переменная ' + value + ' создана', 'success')
                    fetchVariables()
                } catch (error) {
                    alert.show('Что-то пошло не так', 'danger')
                }
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