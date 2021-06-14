import React from "react";
import start_btn from "../resources/start.png"

export const AsideMenu = ({isVisible}) => {
    let newVar = <div>
        {isVisible?<div className="aside ">
                <div className="aside aside-margin-left">
                    <div className="menu">
                        <button className="menu-btn"><img className="img" src={start_btn} alt=""/></button>
                    </div>
                </div>
            </div>:null
        }
    </div>
    return newVar
}