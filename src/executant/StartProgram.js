import React, {useContext} from 'react'
import start_btn from "../resources/start.png";
import {DatabaseContext} from "../context/database/databaseContext";
import {REQ, ASSIGN, STOP, END, REPORT, CONDITION, CYCLE, ELSE, END_CONDITION, END_CYCLE, REPEAT, THEN, WHEN} from "../context/identTypes"
import ReactDOM from "react-dom"

export const StartProgram = ({arr, onChange}) => {
    const {commands,variables,fetchCommands,lastIndex,updateVariable,fetchVariables,addVariable} = useContext(DatabaseContext)
    const array = []

    const req = () => {

        console.log('lastBefore: '+lastIndex)
        fetchCommands()
        console.log('lastAfter: '+lastIndex)
        let res
        let isExistsVariable = false
        Object.keys(commands).map(item => {
            isExistsVariable = false
            // поиск переменной в списке переменных
            console.log(variables)
            Object.keys(variables).map(variable => {
                if (variables[variable].name.toLowerCase() === commands[item].nameVariable){
                    isExistsVariable = true
                }
            })
            if (commands[item].ident===REQ || commands[item].ident===REPORT){
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
                // if (isExistsVariable){
                //     const obj = {
                //         id: commands[item].id,
                //         value: res
                //     }
                //     updateVariable(obj)
                //     fetchVariables()
                // }else{
                //     const obj = {
                //         name: commands[item].nameVariable,
                //         value: res,
                //         commands: commands[item].id
                //     }
                //     addVariable(obj)
                //     fetchVariables()
                // }
                // onChange(commands[item].nameVariable)
                // // array.push(commands[item].nameVariable)
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