import React from "react";

export const ResultProgram = ({arr}) => {

    return (
        <div>
            <div className="container-lg d-flex flex-row border-radius-btn">
                <div className="form-margin-left">
                    <h4><span className="badge badge-secondary">Результат</span></h4>
                    <div className="div-border div-margin-3 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                        <div id="result">
                            {arr.map(item =>
                                (
                                    <div key={item.toString()}>
                                        {item}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}