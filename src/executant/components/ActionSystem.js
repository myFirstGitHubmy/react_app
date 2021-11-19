import React, {useContext, useState} from "react";
import {DatabaseContext} from "../../context/database/databaseContext";
import {ConditionForm} from "./actions/ConditionForm";

export const ActionSystem = ({conditionChange, setConditionChange}) => {
    const {variables,  fetchCommands, addCommands} = useContext(DatabaseContext)
    const [when, setWhen] = useState('')

    return (
        <div>
            <h3 className=""><span className="badge badge-secondary form-margin-left">Действия</span></h3>
            <div className="div-border form-margin-left">
                <div className="div-margin-3 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                    <div><ConditionForm array={variables} toggleCondition={setConditionChange}/></div>
                    <div>
                        <button disabled={conditionChange} type="button" className="btn btn-outline-primary" onClick={() => {
                            addCommands({name: 'То', ident: 'THEN',status: true})
                            fetchCommands()
                        }}>
                            То ...
                        </button>
                    </div>
                    <div>
                        <button disabled={conditionChange} type="button" className="btn btn-outline-primary" onClick={
                            () => {
                                addCommands({name: 'Иначе', ident: 'ELSE', status: true})
                                fetchCommands()
                                if (conditionChange===false) {
                                    setConditionChange()
                                }
                            }}>
                            Иначе ...
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-primary" onClick={
                            () => {
                                console.log(conditionChange)
                                addCommands({name: 'Конец ветвления', ident: 'END_CONDITION',status: true})
                                setConditionChange()
                                console.log(conditionChange)
                                fetchCommands()
                            }}>
                            Конец ветвления
                        </button>
                    </div>
                </div>

                <div className="div-margin-3 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                    <div>
                        <button type="button" className="btn btn-primary" onClick={
                            () => {
                                addCommands({name: 'Цикл', ident: 'CYCLE',status: true})
                                fetchCommands()
                            }}>
                            Цикл
                        </button>
                        <div className="modal fade" id="exampleModalCircle" tabIndex="-1" role="dialog"
                             aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Пока</h5>
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
                                                onChange={e => setWhen(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => {
                                            fetchCommands()
                                        }} data-dismiss="modal">Отмена</button>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={
                                            () => {
                                                addCommands({name: 'Пока '+when, ident: 'WHEN',status: true})
                                                fetchCommands()
                                            }}>Сохранить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-primary"  data-toggle="modal" data-target="#exampleModalCircle" >
                            Пока ...
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-primary" onClick={
                            () => {
                                addCommands({name: 'Повторять ', ident: 'REPEAT',status: true})
                                fetchCommands()
                            }}>
                            Повторять ...
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-primary" onClick={
                            () => {
                                addCommands({name: 'Конец цикла', ident: 'END_CYCLE',status: true})
                                fetchCommands()
                            }}>
                            Конец цикла
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}