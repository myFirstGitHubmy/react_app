import React, {useReducer,useState} from "react";
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
    const [index, setIndex] = useState(0)
    const [condition, setCondition] = useState([])


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

    const updateVariable = async (variable) => {
        const variables = await axios.get('http://localhost:8080/api/var/update?id='+variable.id+'&value='+variable.value)
        console.log(variables)
        const payload = {
                ...variables.data,
                id: variables.data.id
            }
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

            console.log(resComm)
            const payload = {
                    ...resComm.data,
                    id: resComm.data.id,
                    index:resComm.data.id
                }
            console.log('index add_com: '+resComm.data.id)
            dispatch({type: ADD_COMM, payload})
            setIndex(resComm.data.id)
        }catch (e){
            throw new Error(e.message)
        }
    }

    const fetchCommands = async () => {
        const result = await axios.get('http://localhost:8080/api/com/getAll')
        console.log(result)
        let index = 0
        const payload = Object.keys(result.data).map(key => {
            index = result.data[key].id
            return {
                ...result.data[key],
                id:result.data[key].id
            }
        })
        console.log('index fetch_com: '+index)
        dispatch({type: FETCH_COMM, payload})
        setIndex(index+1)
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

    const updateStatusCommand = async (command) => {
        const comm = await axios.post('http://localhost:8080/api/com/', command)
        const payload = Object.keys(comm.data).map(key => {
            return {
                ...comm.data[key],
                id:comm.data[key].id
            }
        })
        dispatch({type: FETCH_COMM, payload})
    }

    const removeAll = async () => {
        await axios.get('http://localhost:8080/api/db/deleteAll/')
    }

    const updateCondition = (condition_obj) => {
        setCondition([...condition, condition_obj])
    }

    return (
        <DatabaseContext.Provider value={{
            addVariable,
            fetchVariables,
            updateVariable,
            addCommands,
            fetchCommands,
            removeVariables,
            removeCommands,
            updateCondition,
            removeAll,
            variables: state.variables,
            commands: state.commands,
            condition: condition,
            lastIndex: index
        }}
        >
            {children}
        </DatabaseContext.Provider>
)
}