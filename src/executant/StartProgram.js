import React, {useContext, useEffect} from 'react'
import start_btn from "../resources/start.png";
import {DatabaseContext} from "../context/database/databaseContext";
import {REQ, ASSIGN, STOP, END, REPORT, CONDITION, CYCLE, ELSE, END_CONDITION, END_CYCLE, REPEAT, THEN, WHEN} from "../context/identTypes"
import ReactDOM from "react-dom"
import axios from "axios";

export const StartProgram = ({arr, onChange}) => {
    const {commands,condition,variables,fetchCommands,lastIndex,updateVariable,fetchVariables,addVariable,fetchCondition,updateStatusCommand} = useContext(DatabaseContext)
    const array = []
    let indexCondition = 0

    useEffect(() => {
        fetchCommands()
        fetchCondition()
        fetchVariables()
    },[])

    const indexToZero = () => {
        indexCondition = 0
    }

    const updateVar = (id, value) => () => updateVariable({
            id: id,
            value: value})

    const addVar = (name, value, command) => addVariable({
            name: name,
            value: value,
            commands: command
        })

    const req = () => {
        console.log('lastBefore: '+lastIndex)
        fetchCommands()
        fetchCondition()
        console.log('lastAfter: '+lastIndex)
        let res
        let isExistsVariable = false
        let conditionCheck = null
        let currentVariable = null
        Object.keys(commands).map(item => {
            console.log('id_commands: '+commands[item].id)
            fetchVariables()
            isExistsVariable = false
            console.log(variables)
            // поиск переменной в списке переменных
            if (variables === null){
                isExistsVariable = true
            }
            Object.keys(variables).map(variable => {
                if (variables[variable].name === commands[item].nameVariable){
                    isExistsVariable = true
                    currentVariable = variables[variable]
                }
            })
            if (commands[item].ident===REQ  && (conditionCheck === null || indexCondition === 1 )){
               res = prompt('Введите значение переменной: '+commands[item].nameVariable)
                if (isExistsVariable){
                    updateVar(currentVariable.commands, res)
                    console.log('update variable')
                    setInterval(null,2000)
                    fetchVariables()
                }else{
                    addVar(commands[item].nameVariable, res, commands[item].id)
                }
                array.push(commands[item].nameVariable + ' = '+ res)
                indexToZero()
            }else if (commands[item].ident===ASSIGN   && (conditionCheck === null || indexCondition === 1 )){
                if (isExistsVariable){
                    updateVar(currentVariable.commands, commands[item].valueVariable)
                    setInterval(null, 1000)
                    fetchVariables()
                }else{
                    addVar(commands[item].nameVariable, commands[item].valueVariable, commands[item].id)
                }
                indexToZero()
            }else if (commands[item].ident===REPORT  && (conditionCheck === null || indexCondition === 1)){
                if (commands[item].nameVariable != null && commands[item].valueVariable != null){
                    array.push(commands[item].nameVariable + ' = '+ commands[item].valueVariable)
                }else{
                    array.push('text = '+ commands[item].nameVariable)
                }
                indexToZero()
            }else if (commands[item].ident===CONDITION){
                console.log("================condition=============")
                let first = null
                Object.keys(condition).filter(cond => condition[cond].command_id = commands[item].id).map(it => {
                    let second = null
                    if (it.toString() === '0'){
                        variables.forEach(el => {if (el.name===condition[it].name){
                            first = parseInt(el.value)
                        }})

                    }
                    if (it.toString() === '1'){
                        variables.forEach(el => {if (el.name===condition[it].name){
                            second = parseInt(el.value)
                        }})

                    }
                    if (commands[item].name.indexOf(">")>0 && '1' === it.toString()){
                        conditionCheck = first > second;
                        console.log(first+' > '+second)
                        console.log('> '+conditionCheck)
                    }else if (commands[item].name.indexOf("<")>0 && '1' === it.toString()){
                        conditionCheck = first < second;
                        console.log('first: '+first+ ' second: '+second)
                        console.log('<')
                    }else if (commands[item].name.indexOf("=")>0 && '1' === it.toString()){
                        conditionCheck = first === second;
                        console.log('=')
                    }else if (commands[item].name.indexOf("<=")>0 && '1' === it.toString()){
                        conditionCheck = first <= second;
                        console.log('<=')
                    }else if (commands[item].name.indexOf(">=")>0 && '1' === it.toString()){
                        conditionCheck = first >= second;
                        console.log('>=')
                    }
                })
            }else if (commands[item].ident===THEN && conditionCheck === true){
                console.log('conditionCheck1: '+conditionCheck)
                indexCondition = 1
            }else if (commands[item].ident===ELSE && conditionCheck === false){
                indexCondition = 1
                console.log('conditionCheck2: '+conditionCheck)
            }else if (commands[item].ident===END_CONDITION){
                conditionCheck = null
                indexToZero()
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