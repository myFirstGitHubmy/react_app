import React, {useContext} from "react";
import {DatabaseContext} from "../../context/database/databaseContext";

export const ActionSystem = () => {
    const {commands,variables,  fetchCommands, removeVariables, fetchVariables,addCommands} = useContext(DatabaseContext)

    return (
        <div>
            <h3 className=""><span className="badge badge-secondary form-margin-left">Действия</span></h3>
            <div className="div-border form-margin-left">
                <div className="div-margin-3 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                    <div><ConditionForm array={variables}/></div>
                    <div>
                        <button type="button" className="btn btn-outline-primary" onClick={() => {
                            addCommands({name: 'То', ident: 'THEN'})
                            fetchCommands()
                        }}>
                            То ...
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-primary" onClick={
                            () => {
                                addCommands({name: 'Иначе', ident: 'ELSE'})
                                fetchCommands()
                            }}>
                            Иначе ...
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-primary" onClick={
                            () => {
                                addCommands({name: 'Конец ветвления', ident: 'END_CONDITION'})
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
                                addCommands({name: 'Цикл', ident: 'Cicle'})
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
                                                addCommands({name: 'Пока '+when, ident: 'WHEN'})
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
                                addCommands({name: 'Повторять ', ident: 'REPEAT'})
                                fetchCommands()
                            }}>
                            Повторять ...
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-primary" onClick={
                            () => {
                                addCommands({name: 'Конец цикла', ident: 'END_CIRCLE'})
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