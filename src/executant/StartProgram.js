import React, {useContext} from 'react'
import start_btn from "../resources/start.png";
import {DatabaseContext} from "../context/database/databaseContext";
import {REQ, ASSIGN, STOP, END, REPORT, CONDITION, CYCLE, ELSE, END_CONDITION, END_CYCLE, REPEAT, THEN, WHEN} from "../context/identTypes"
import ReactDOM from "react-dom"
import axios from "axios";

export const StartProgram = ({arr, onChange}) => {
    const {commands,condition,variables,fetchCommands,lastIndex,updateVariable,fetchVariables,addVariable,fetchCondition} = useContext(DatabaseContext)
    const array = []

    const req = () => {

        console.log('lastBefore: '+lastIndex)
        fetchCommands()
        fetchVariables()
        fetchCondition()
        fetchCondition()
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
            if (commands[item].ident===REQ){
               res = prompt('Введите значение переменной: '+commands[item].nameVariable)
                if (isExistsVariable){
                    updateVariable({
                        id: commands[item].id,
                        value: res})
                    fetchVariables()
                }else{
                    addVariable({
                        name: commands[item].nameVariable,
                        value: res,
                        commands: commands[item].id
                    })
                }
                array.push(commands[item].nameVariable + ' = '+ res)
                console.log(array)
                // array.push(commands[item].nameVariable + ' = '+res)
                //     .then(res => console.log(res))
            }else if (commands[item].ident===ASSIGN){
                if (isExistsVariable){
                    updateVariable({
                        id: commands[item].id,
                        value: commands[item].valueVariable})
                    fetchVariables()
                }else{
                    addVariable({
                        name: commands[item].nameVariable,
                        value: commands[item].valueVariable,
                        commands: commands[item].id
                    })
                }
            }else if (commands[item].ident===REPORT){
                if (commands[item].nameVariable != null && commands[item].valueVariable != null){
                    array.push(commands[item].nameVariable + ' = '+ commands[item].valueVariable)
                }else{
                    array.push('text = '+ commands[item].nameVariable)
                }
                // array.push(commands[item].nameVariable)
            }else if (commands[item].ident===CONDITION){
                console.log("================condition=============")
                let first = null
                Object.keys(condition).filter(cond => condition[cond].command_id = commands[item].id).map(it => {
                    const second_var = 2
                    if (it.toString() === '0'){
                        first = condition[it]
                    }
                    if (commands[item].name.indexOf(">")>0 && '1' === it.toString()){
                        console.log(first);
                        console.log(condition[it])
                        if (parseInt(first.value)>parseInt(condition[it].value)){
                            console.log("fuck")
                        }
                    }

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