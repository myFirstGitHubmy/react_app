import React, {useContext, useState} from "react";
import {DatabaseContext} from "../context/database/databaseContext";


export const VariableList = ({props,handleChange}) => {
    const database = useContext(DatabaseContext)

    const [variables, setVariables] = useState([])

    const getAllVar = () => {
        setVariables(database.variables)
    }

    return (<div className="input-group mb-3">
        <select className="custom-select" onChange={event => handleChange(event)} onClick={getAllVar}>
            { variables ? variables.map(key =>(
                <option value={key.id} key={key.id}>
                    {key.name + ' ( value: '+key.value+' )'}
                </option>
                ))
                :<option>empty</option>
            }
        </select>
    </div>)
}