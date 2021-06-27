import React, {useContext, useState} from "react";
import {AlertContext} from "../../../context/alert/alertContext";
import {DatabaseContext} from "../../../context/database/databaseContext";

export const RequestForm = () => {
    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)
    const database = useContext(DatabaseContext)

    const saveVariable = () => {
       if (value.trim()){
               const com = {
                   name: 'Запросить '+ value,
                   ident: 'REQ',
                   status: true
               }
               database.addCommands(com)
                   .then()
               database.fetchCommands()
                   .then(() => console.log("update commands"))
               const varObject = {name: value, value: null}
           try{
               database.addVariable(varObject)
                   .catch(err => {console.log(err.message)})
               alert.show('Переменная ' + value + ' создана', 'success')
           }catch (error){
               alert.show('Что-то пошло не так', 'danger')
           }
               setValue('')
       }else{
           alert.show('Введите название переменной')
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