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


    const addVariable = async variable => {
        try{
            const result = await axios.post('http://localhost:8080/api/add_var', variable)
            const payload = Object.keys(result.data).map(key => {
                return ({
                    id: result.data.id,
                    ...result.data[key]

                })
            })
            dispatch({type:ADD_VAR, payload})
        }catch (e){
            throw new Error(e.message)
        }
    }

    // const fetchVariable = async (variable) => {
    //     const variableObj = await axios.post('http://localhost:8080/api/update/var',variable).then(e => console.log(e)).catch(err=> console.log(err))
    //     const payload = Object.keys(variableObj.data).map(key => {
    //         return {
    //             ...variableObj.data[key],
    //             id: key
    //         }
    //     })
    //     dispatch({type: FETCH_VAR, payload})
    //
    // }

    const fetchCommands = async () => {
        const result = await axios.get('http://localhost:8080/api/allCommands')
        const payload = Object.keys(result.data).map(key => {
            return {
                ...result.data[key],
                id:key
            }
        })
        dispatch({type: FETCH_COMM, payload})
    }

    const fetchVariables = async () => {

        const variables = await axios.get('http://localhost:8080/api/allVars')
        console.log(variables)
        const payload = Object.keys(variables.data).map(key => {
            return {
                ...variables.data[key],
                id: key
            }
        })
        dispatch({type: FETCH_VAR, payload})
    }

    const removeVariables = async id => {
        const url = 'http://localhost:8080/api/var/delete/'+id
            await axios.get(url)
        const variablesList = await axios.get('http://localhost:8080/api/allVars')
        const payload = Object.keys(variablesList.data).map(key => {
            return {
                ...variablesList.data[key],
                id: id
            }
        })
        dispatch({type: FETCH_VAR, payload})
    }

    const addCommands = async command => {

        const comm = {
            name: command.name,
            ident: command.ident,
            status: true
        }

        try {
            const resComm = await axios.post('http://localhost:8080/api/addComm',comm)
            const payload = Object.keys(resComm.data).map(key => {
                return {
                    ...resComm.data[key]
                }
            })
            dispatch({type: ADD_COMM, payload})

        }catch (e){
            throw new Error(e.message)
        }
    }

    return (
        <DatabaseContext.Provider value={{
            addVariable,
            fetchVariables,
            addCommands,
            fetchCommands,
            removeVariables,
            variables: state.variables,
            commands: state.commands
        }}
        >
            {children}
        </DatabaseContext.Provider>
)
}