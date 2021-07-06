import React, {useContext} from "react";
import {StartProgram} from "../StartProgram"
import {DatabaseContext} from "../../context/database/databaseContext"
import basket from "../../resources/basket.png"
import ReactDOM from "react-dom"

export const AsideMenu = ({result,isVisible, onToggleResult}) => {

    const {removeAll,fetchCommands, fetchVariables,addCommands} = useContext(DatabaseContext)

    const remove = () => {
        removeAll()
        fetchCommands()
        fetchVariables()
        window.location.reload()
    }

    let newVar =
        <div>
            <div>
                {isVisible?<div className="aside ">
                    <div className="aside aside-margin-left">
                        <div className="menu">
                            <StartProgram arr={result} onChange={onToggleResult}/>
                        </div>
                        <div>
                            <button type="button" className="btn btn-outline-info" onClick={
                                () => {
                                    addCommands({name: 'Конец', ident: 'END'})
                                    fetchCommands()
                                }}>
                                <h5>Конец</h5>
                            </button>
                        </div>
                        <div>
                            <button className="menu-btn" onClick={()=> remove()}><img className="menu img" src={basket} alt="menu"/></button>
                        </div>
                    </div>
                </div>:null
                }
            </div>

        </div>

    return newVar
}

ReactDOM.render(
    AsideMenu,
    document.getElementById('root')
)