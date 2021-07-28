import React, {useContext} from 'react'
import start_btn from "../resources/start.png";
import {DatabaseContext} from "../context/database/databaseContext";
import {REQ, ASSIGN, STOP, END, REPORT, CONDITION, CYCLE, ELSE, END_CONDITION, END_CYCLE, REPEAT, THEN, WHEN} from "../context/identTypes"
import ReactDOM from "react-dom"

export const StartProgram = ({arr, onChange}) => {
    const {commands,condition,variables,fetchCommands,lastIndex,updateVariable,fetchVariables,addVariable} = useContext(DatabaseContext)
    const array = []

    const req = () => {

        console.log('lastBefore: '+lastIndex)
        fetchCommands()
        fetchVariables()
        console.log('lastAfter: '+lastIndex)
        let res
        let isExistsVariable = false
        Object.keys(commands).map(item => {
            isExistsVariable = false
            // поиск переменной в списке переменных
            console.log(variables)
            if (variables === null){
                isExistsVariable = true
            }
            Object.keys(variables).map(variable => {
                if (variables[variable].name === commands[item].nameVariable){
                    isExistsVariable = true
                }
            })
            if (commands[item].ident===REQ || commands[item].ident===ASSIGN){
               res = prompt('Введите значение переменной: '+commands[item].nameVariable)
                if (isExistsVariable){
                    const obj = {
                        id: commands[item].id,
                        value: res
                    }
                    updateVariable(obj)
                    fetchVariables()
                }else{
                    const obj = {
                        name: commands[item].nameVariable,
                        value: res,
                        commands: commands[item].id
                    }
                    addVariable(obj)
                }
                array.push(commands[item].nameVariable + ' = '+ res)
                console.log(array)
                // array.push(commands[item].nameVariable + ' = '+res)
                //     .then(res => console.log(res))
            }else if (commands[item].ident===REPORT){
                if (commands[item].nameVariable != null && commands[item].valueVariable != null){
                    array.push(commands[item].nameVariable + ' = '+ commands[item].valueVariable)
                }else{
                    array.push('text = '+ commands[item].nameVariable)
                }
                // array.push(commands[item].nameVariable)
            }else if (commands[item].ident===CONDITION){
                console.log("================condition=============")
                Object.keys(condition).map(item => {
                    console.log(condition[item].name + ' - '+ condition[item].value)
                })

            }
        })
        onChange(array)
    }

    return (
        <div>
            <button className="menu-btn" onClick={req}><img className="img" src={start_btn} alt=""/></button>
        </div>
    )
}

ReactDOM.render(
    StartProgram,
    document.getElementById('root')
)