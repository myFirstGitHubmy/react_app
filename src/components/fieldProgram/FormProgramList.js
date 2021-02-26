import React from "react";
import {FormProgramItem} from "./FormProgramItem";

export const FormProgramList = ({array}) => {
    return (
        <div>
            {array.map(arr => (
                    <FormProgramItem index={arr.toString()} name={arr.name}/>
                )
            )}
        </div>
    )
}