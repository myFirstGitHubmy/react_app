import React,  {useContext, useState, useEffect} from 'react'
import {DatabaseContext} from "../../context/database/databaseContext";
import {VariableList} from "./VariableList";
import {AlertContext} from "../../context/alert/alertContext";
import {Notes} from "../../components/Notes";
import menuIcon from "../../resources/menu.png"
import {AsideMenu} from "./AsideMenu"
import ReactDom from "react-dom";
import {ExecutorCommandSystem} from "./ExecutorCommandSystem"
import {ActionSystem} from "./ActionSystem";
import {ResultProgram} from "./ResultProgram";

export const Form = () => {

    const {fetchCommands, fetchCondition, fetchVariables} = useContext(DatabaseContext)
    const [isVisibleMenu,setVisibleMenu] = useState(false)
    const [result, setResult] = useState([])
    const [conditionChange, setConditionChange] = useState(true)

    useEffect(()=>{
        fetchCommands()
        fetchCondition()
        fetchVariables()
    },[])

    const toggleResult = (array) => {
        setResult(array)
    }

    const toggleCondition = () => {
        console.log("ПОМЕНЯЛОСЬ CONDITION")
        setConditionChange(!conditionChange)
    }

    return (
        <div className="container-lg d-flex flex-row border-radius-btn">

            <div className="container-lg d-flex flex-row border-radius-btn">
                <div className="menu">
                    <div className="menu">
                        <button className="menu-btn" onClick={()=> setVisibleMenu(!isVisibleMenu)}><img className="menu img" src={menuIcon} alt="menu"/></button>
                    </div>
                    <AsideMenu isVisible={isVisibleMenu} result={result} onToggleResult={toggleResult}/>
                </div>
                <div className="container-lg d-flex flex-row border-radius-btn">
                    <div className="form-margin-left">
                        <VariableList />
                    </div>
                </div>
                <div>
                    <ExecutorCommandSystem />
                    <ActionSystem conditionChange={conditionChange} setConditionChange={toggleCondition}/>
                    <ResultProgram arr={result}/>
                </div>

                <Notes/>


            </div>
        </div>
    )
}

ReactDom.render(
    Form,
    document.getElementById('root')
)


