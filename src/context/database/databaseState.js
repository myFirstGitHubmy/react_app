import React, {useReducer} from "react";
import {databaseReducer} from "./databaseReducer";
import axios from "axios";
import {DatabaseContext} from "./databaseContext";
import {ADD_COMM, ADD_VAR, FETCH_COMM, FETCH_VAR, REMOVE_VAR} from "../types";

export const DatabaseState = ({children}) => {
    const initialState = {
        variables: [],
        commands: []
    }

    const [state, dispatch] = useReducer(databaseReducer, initialState)


    const addVariable = async (variable) => {
        try{
            const result = await axios.post('http://localhost:8080/api/var/add', variable)
            const payload = Object.keys(result.data).map(key => {
                return ({
                    id: result.data[key].id,
                    ...result.data[key]

                })
            })
            dispatch({type:ADD_VAR, payload})
        }catch (e){
            throw new Error(e.message)
        }

    }

    const fetchVariables = async () => {
        const variables = await axios.get('http://localhost:8080/api/var/getAll')
        console.log(variables)
        const payload = Object.keys(variables.data).map(key => {
            return {
                ...variables.data[key],
                id: variables.data[key].id
            }
        })
        dispatch({type: FETCH_VAR, payload})
    }


    const removeVariables = async id => {
        const url = 'http://localhost:8080/api/var/delete/'+id
        await axios.get(url)
        const variablesList = await axios.get('http://localhost:8080/api/var/getAll')
        const payload = Object.keys(variablesList.data).map(key => {
            return {
                ...variablesList.data[key],
                id: variablesList.data[key].id
            }
        })
        dispatch({type: FETCH_VAR, payload})
    }

    const addCommands = async (command) => {
        try {
            const resComm = await axios.post('http://localhost:8080/api/com/add',command)
            const payload = Object.keys(resComm.data).map(key => {
                return {
                    ...resComm.data[key],
                    id: key
                }
            })
            dispatch({type: ADD_COMM, payload})

        }catch (e){
            throw new Error(e.message)
        }
    }

    const fetchCommands = async () => {
        const result = await axios.get('http://localhost:8080/api/com/getAll')
        console.log(result)
        const payload = Object.keys(result.data).map(key => {
            return {
                ...result.data[key],
                id:result.data[key].id
            }
        })
        dispatch({type: FETCH_COMM, payload})
    }

    const removeCommands = async id => {
        const url = 'http://localhost:8080/api/com/delete/'+id
        await axios.get(url)
        const commandList = await axios.get('http://localhost:8080/api/com/getAll')
        const payload = Object.keys(commandList.data).map(key => {
            console.log('commandList.data[key]: '+commandList.data[key].id)
            return {
                ...commandList.data[key],
                id: commandList.data[key].id
            }
        })
        dispatch({type: FETCH_COMM, payload})
    }


    return (
        <DatabaseContext.Provider value={{
            addVariable,
            fetchVariables,
            addCommands,
            fetchCommands,
            removeVariables,
            removeCommands,
            variables: state.variables,
            commands: state.commands
        }}
        >
            {children}
        </DatabaseContext.Provider>
)
}