import React, {useContext} from "react";
import {DatabaseState} from "../context/database/databaseState";
import {DatabaseContext} from "../context/database/databaseContext";
import ReactDOM from 'react-dom'

export const VariableList = ({onRemove, array}) => {
    const database = useContext(DatabaseContext)

    const onFetch = () => {
        database.fetchVariables()
            .catch(err => console.log(err.message))
        console.log(database.variables)
    }

    return (<div>
        <div className="modal fade" id="exampleModalVariables" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 class="modal-title">Variables</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="container">
                        <ul className="list-group">
                            {array.length !== 0 ? Object.keys(array).map(item => <li className="list-group-item" key={array[item].id}>
                                {array[item].name}&nbsp;
                                <button type="button" className="btn btn-danger item" onClick={()=>onRemove(array[item].id)}>Delete</button>
                            </li>): <p>list is empty</p>}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <button type="button" onClick={() => onFetch()} className="btn btn-warning" data-toggle="modal" data-target="#exampleModalVariables">
                VARIABLES
            </button>
        </div>
    </div>)
}

    ReactDOM.render(
        VariableList,
        document.getElementById('root')
    )


