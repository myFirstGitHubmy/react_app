import React,  {useContext, useState, useEffect} from 'react'
import {RequestForm} from "./actions/RequestForm";
import {AssignForm} from "./actions/AssignForm";
import {ReportForm} from "./actions/ReportForm";
import {DatabaseContext} from "../../context/database/databaseContext";
import {VariableList} from "./VariableList";
import {AlertContext} from "../../context/alert/alertContext";
import {Alert} from "../../components/Alert";
import {Notes} from "../../components/Notes";
import {ConditionForm} from "./actions/ConditionForm";
import menuIcon from "../../resources/menu.png"
import {AsideMenu} from "./AsideMenu"
import ReactDom from "react-dom";
import {ExecutorCommandSystem} from "./ExecutorCommandSystem"


export const Form = () => {

    const {commands,variables,  fetchCommands, removeVariables, fetchVariables,addCommands} = useContext(DatabaseContext)
    const alert = useContext(AlertContext)
    const [isVisibleMenu,setVisibleMenu] = useState(false)

    useEffect(()=>{
        fetchCommands()
    },[])

    return (
        <div>

            <div className="container-lg d-flex flex-row border-radius-btn">
                <div className="menu">
                    <div className="menu">
                        <button className="menu-btn" onClick={()=> setVisibleMenu(!isVisibleMenu)}><img className="menu img" src={menuIcon} alt="menu"/></button>
                    </div>
                    <AsideMenu isVisible={isVisibleMenu}/>
                </div>
                <div>
                    <div className="form-margin-left">
                        <VariableList />
                    </div>
                </div>
                <ExecutorCommandSystem />
                <Notes/>
            </div>
        </div>
    )
}

ReactDom.render(
    Form,
    document.getElementById('root')
)


