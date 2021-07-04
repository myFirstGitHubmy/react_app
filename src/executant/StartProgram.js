import React, {useContext} from 'react'
import start_btn from "../resources/start.png";
import {DatabaseContext} from "../context/database/databaseContext";
import {REQ, ASSIGN, STOP, END, REPORT, CONDITION, CYCLE, ELSE, END_CONDITION, END_CYCLE, REPEAT, THEN, WHEN} from "../context/identTypes"

export const StartProgram = () => {
    const {commands,fetchCommands,lastIndex,updateVariable,fetchVariables} = useContext(DatabaseContext)

    const req = () => {
        console.log('lastBefore: '+lastIndex)
        fetchCommands()
        console.log('lastAfter: '+lastIndex)
        let res
        Object.keys(commands).map(item => {
            console.log('commands[item].ident '+commands[item].ident+' item '+ item)
            if (commands[item].ident===REQ){
               res = prompt('Введите значение переменной: '+commands[item].name)
                const obj = {
                    id: commands[item].id,
                    value: res
                }
                console.log(obj)
                updateVariable(obj)
                fetchVariables()
                    .then(res => console.log(res))
            }else if (commands[item].ident===REPORT){
                console.log('startProgram report: '+ commands[item].name)
            }
        })

    }

    return (
        <div>
            <button className="menu-btn" onClick={req}><img className="img" src={start_btn} alt=""/></button>
        </div>
    )
}