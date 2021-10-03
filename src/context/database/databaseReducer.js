import {
    ADD_COMM,
    ADD_CONDITION,
    ADD_VAR,
    FETCH_COMM,
    FETCH_CONDITION,
    FETCH_VAR,
    REMOVE_COMM, REMOVE_CONDITION,
    REMOVE_VAR
} from "../types";

const handlers = {
    [ADD_VAR]: (state, {payload}) => ({...state, variables: [...state.variables, payload]}),
    [ADD_CONDITION]: (state, {payload}) => ({...state, condition: [...state.condition, payload]}),
    [ADD_COMM]: (state, {payload}) => ({...state, lastIndex: payload.index, commands: [...state.commands, payload]}),
    [FETCH_VAR]: (state, {payload}) => ({...state, variables: payload}),
    [FETCH_COMM]: (state, {payload}) => ({...state, lastIndex: payload.index, commands: payload}),
    [FETCH_CONDITION]: (state, {payload}) => ({...state, lastIndex: payload.index, condition: payload}),
    [REMOVE_VAR]: (state, {payload}) => ({
        ...state,
        variables: state.variables.filter(variable => variable.id !== payload)}),
    [REMOVE_COMM]: (state, {payload}) => ({
        ...state,
        variables: state.commands.filter(variable => variable.id !== payload)}),
    [REMOVE_CONDITION]: (state, {payload}) => ({
        ...state,
        variables: state.condition.filter(condition => condition.id !== payload)}),
    DEFAULT: state => state
}

export const databaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}