import React from "react";
import start_btn from "../../resources/start.png"
import {StartProgram} from "../StartProgram"

export const AsideMenu = ({isVisible}) => {

    let newVar =
        <div>
            <div>
                {isVisible?<div className="aside ">
                    <div className="aside aside-margin-left">
                        <div className="menu">
                            <StartProgram />
                        </div>
                        <div>
                            <button type="button" className="btn btn-outline-info" onClick={
                                () => {
                                    // addCommands({name: 'Конец', ident: 'END'})
                                    // fetchCommands()
                                }}>
                                <h5>Конец</h5>
                            </button>
                        </div>
                    </div>
                </div>:null
                }
            </div>

        </div>

    return newVar
}