import React from 'react'
import {ADD_VAR} from "../types";

const handlers = {
    [ADD_VAR]: (state, {payload})=>({...payload, visible:true}),
    DEFAULT: state => state
}

export const dataReducer = (state, action) => {

}