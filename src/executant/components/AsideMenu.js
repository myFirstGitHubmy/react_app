import React from "react";
import start_btn from "../../resources/start.png"

export const AsideMenu = ({isVisible}) => {
    const req = () => {
        let res = prompt('Введите значение переменной: А')
    }


    let newVar =
        <div>
            <div>
                {isVisible?<div className="aside ">
                    <div className="aside aside-margin-left">
                        <div className="menu">
                            <button className="menu-btn" onClick={req}><img className="img" src={start_btn} alt=""/></button>
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