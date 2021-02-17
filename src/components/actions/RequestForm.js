import React, {useContext, useState} from "react";
import {Alert} from "../Alert";
import {AlertContext} from "../../context/alert/alertContext";
import {DatabaseContext} from "../../context/database/databaseContext";

export const RequestForm = () => {
    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)
    const database = useContext(DatabaseContext)
    const [variables, setVariables] = useState([])
    const [comm, setComm] = useState(database.commands)

    const saveVariable = event => {
       if (value.trim()){
           try {
               const com = {
                   name: 'Запросить '+ value,
                   ident: 'REQ'
               }
               database.addCommands(com)
               setComm(database.commands)
                console.log('comm id: '+database.commands)
               database.fetchVariable({id: comm.variables[0].id, name: value, value: null,comm: comm.id}).then(
                   res => setVariables({res}),
                   alert.show('Переменная ' + value + ' создана', 'success')
               ).catch(err=> alert.show('Что-то пошло не так ('+<span>{err.message}</span>+')', 'danger'))

               setValue('')
           }catch (e){
               alert.show('Что-то пошло не так ('+<span>{e.message}</span>+')','danger')
           }
       }else{
           alert.show('Введите название переменной')
       }
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                Запросить
            </button>
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Запросить</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                            <div className="container">
                                <Alert/>
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
                            <button type="button" className="btn btn-primary" onClick={saveVariable}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}