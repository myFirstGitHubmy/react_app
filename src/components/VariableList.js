import React, {useContext, useState} from "react";
import {DatabaseContext} from "../context/database/databaseContext";

export const VariableList = ({array}) => {
    const {variables,removeVariables,fetchVariables} = useContext(DatabaseContext)

    const [variabless, setVariables] = useState(array)

    const fetch = () => {
        fetchVariables()
            .catch(err => console.log(err.message))
        setVariables([...variables])
    }

    const deleteVariable = (id) => {
        removeVariables(id)
            .catch(err => console.log(err.message))
        setVariables([...variables])
    }

    const result = (
        <div>

            <div className="modal fade" id="exampleModalVariables" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                            <div className="container">
                                <ul className="list-group">
                                    {variabless.map(item => <li className="list-group-item" key={item.id}>
                                        {item.name}
                                        <button type="button" className="btn btn-danger item" onClick={() => deleteVariable(item.id)}>Delete</button>
                                    </li>)}
                                </ul>
                            </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <button type="button" onClick={fetch} className="btn btn-primary" data-toggle="modal" data-target="#exampleModalVariables">
                Список переменных
            </button>
            {result}
        </div>

    )

}

