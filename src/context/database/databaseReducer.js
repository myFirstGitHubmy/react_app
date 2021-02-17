import {ADD_COMM, ADD_VAR, FETCH_COMM, FETCH_VAR, REMOVE_COMM, REMOVE_VAR} from "../types";

const handlers = {
    [ADD_VAR]: (state, {payload}) => ({...state, variables: [...state.variables, payload]}),
    [ADD_COMM]: (state, {payload}) => ({...state, commands: [...state.commands, payload]}),
    [FETCH_VAR]: (state, {payload}) => ({...state, variables: payload}),
    [FETCH_COMM]: (state, {payload}) => ({...state, commands: payload}),
    [REMOVE_VAR]: (state, {payload}) => ({
        ...state,
        variables: state.variables.filter(variable => variable.id !== payload)}),
    [REMOVE_COMM]: (state, {payload}) => ({
        ...state,
        variables: state.commands.filter(variable => variable.id !== payload)}),
    DEFAULT: state => state
}

export const databaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}