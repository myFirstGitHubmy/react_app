import React, {useReducer} from "react";
import {databaseReducer} from "./databaseReducer";
import axios from "axios";
import {DatabaseContext} from "./databaseContext";
import {ADD_COMM, ADD_VAR, FETCH_VAR} from "../types";

export const DatabaseState = ({children}) => {
    const initialState = {variables: []}
    const initialStateCommands = {commands: []}

    const [state, dispatch] = useReducer(databaseReducer, initialState)
    const [stateCommand, dispatchCommand] = useReducer(databaseReducer, initialStateCommands)


    const addVariable = async (variable) => {
        console.log(variable.comm)
        try{
            const result = await axios.post('http://localhost:8080/api/add_var', variable).then(result => console.log(result)).catch(e => console.log(e.message))
            const payload = Object.keys(result.data).map(key => {
                console.log('key: '+ key)
                return {
                    ...result.data[key],
                    id: key
                }
            }
            )
            console.log(state.commands)
            dispatch({type:ADD_VAR, payload})
        }catch (e){
            throw new Error(e.message)
        }
    }

    const fetchVariable = async (variable) => {
        const variableObj = await axios.post('http://localhost:8080/api/update/var',variable).then(e => console.log(e)).catch(err=> console.log(err))
        console.log(variableObj)
        const payload = Object.keys(variableObj.data).map(key => {
            return {
                ...variableObj.data[key],
                id: key
            }
        })
        dispatch({type: FETCH_VAR, payload})

    }

    const fetchVariables = async () => {
        const variables = await axios.get('http://localhost:8080/api/allVars')

        const payload = Object.keys(variables.data).map(key => {
            return {
                ...variables.data[key],
                id: key
            }
        })
        dispatch({type: FETCH_VAR, payload})
    }

    const addCommands = async (command) => {

        const comm = {
            name: command.name,
            ident: command.ident,
            status: true
        }

        try {
            const resComm = await axios.post('http://localhost:8080/api/addComm',comm)
            console.log(resComm)
            const payload = Object.keys(resComm.data).map(key => {
                return {
                    ...resComm.data[key]
                }
            })
            dispatchCommand({type: ADD_COMM, payload})

        }catch (e){
            throw new Error(e.message)
        }
    }

    return (
        <DatabaseContext.Provider value={{
            addVariable,fetchVariable,addCommands,
            variables: state.variables,
            commands: stateCommand.commands
        }}
        >
            {children}
        </DatabaseContext.Provider>
)
}