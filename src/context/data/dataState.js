import React, {useReducer} from 'react'
import {DataContext} from "./dataContext";
import {ADD_VAR} from "../types";

export const DataState = ({children}) => {

    const initial = {
        []:null
    }

    const [state, dispatch] = useReducer(dataReducer,initial)

    const addVariable = (variable) => {
        const  payload = variable
        dispatch({type: ADD_VAR, payload})
    }

    return (
        <DataContext.Provider
            value={
                addVariable
            }
        >
            {children}
        </DataContext.Provider>
    )
}