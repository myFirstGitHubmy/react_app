import React, {useContext, useState} from 'react'
import {RequestForm} from "./actions/RequestForm";
import {AssignForm} from "./actions/AssignForm";
import {ReportForm} from "./actions/ReportForm";
import {DatabaseContext} from "../context/database/databaseContext";
import {VariableList} from "./VariableList";
import {AlertContext} from "../context/alert/alertContext";
import {Alert} from "./Alert";
import {Notes} from "./Notes";
import {ConditionForm} from "./actions/ConditionForm";
import menuIcon from "../resources/menu.png"
import {AsideMenu} from "./AsideMenu"


export const Form = () => {

    const {commands,variables,  fetchCommands, removeVariables, fetchVariables,addCommands} = useContext(DatabaseContext)
    const alert = useContext(AlertContext)
    const [isVisibleMenu,setVisibleMenu] = useState(false)

    return (
        <div className="container-lg d-flex flex-row border-radius-btn">
            <div className="menu">
                <div className="menu">
                    <button className="menu-btn" onClick={()=> setVisibleMenu(!isVisibleMenu)}><img className="menu img" src={menuIcon} alt="menu"/></button>
                </div>
                <AsideMenu isVisible={isVisibleMenu}/>
            </div>
            <div>
                <div className="form-margin-left" hidden>
                    <VariableList array={variables} onRemove={removeVariables}/>
                </div>

                <form>
                    <h2><span className="badge badge-secondary form-margin-left">Система команд исполнителя</span></h2>
                    <div className="form-group"><Alert /></div>
                    <div className="form-group div-border form-margin-left">
                        <div className="div-margin-3 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                            <RequestForm/>
                            <AssignForm />
                            <ReportForm array={variables}/>
                            <div>
                                <button type="button" className="btn btn-primary" onClick={
                                    () => {
                                        addCommands({name: 'Стоп', ident: 'Stop'})
                                        fetchCommands()
                                    }}>
                                    Стоп
                                </button>
                            </div>
                        </div>

                    </div>

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
                                <button type="button" className="btn btn-primary">
                                    Цикл
                                </button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary">
                                    Пока ...
                                </button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary">
                                    Повторять ...
                                </button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary">
                                    Конец цикла
                                </button>
                            </div>
                        </div>


                        <div>
                            <button type="button" className="btn btn-outline-info" onClick={
                                () => {
                                    addCommands({name: 'Конец', ident: 'END'})
                                    fetchCommands()
                                }}>
                                <h5>Конец</h5>
                            </button>
                        </div>

                    </div>
                    <div className="container-lg d-flex flex-row border-radius-btn">
                        <div className="form-margin-left">
                            <h4><span className="badge badge-secondary">Результат</span></h4>
                            <div className="div-border div-margin-3 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                                <div id="result">
                                    <div>A = 5</div>
                                    <div>B = 7</div>
                                    <div>Ответ: </div>
                                    <div>C = 6</div>
                                </div>
                            </div>
                        </div>
                    </div>


                </form>
            </div>
            <div id="program" className="div-border">
                <div className="div-margin-1"><span>Начало</span></div>
                    <Notes notes={commands}/>
            </div>
            </div>

    )
}


