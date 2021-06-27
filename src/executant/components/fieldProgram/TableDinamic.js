import React, {useContext, useState} from "react";
import ellips from "../../../resources/ellipse.png"

export const TableDinamic = (props, {handleArray}) => {
    let array = props.array
    let tableArr = new Array({id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6},{id: 7},{id: 8},{id: 9},{id: 10})
    const [classEl, setClassEl] = useState('td-border ')
    

    const table = (array) =>
    {
        const handleOperation = (oper,id,update) => {
            let classString = classEl
            const operationName = props.operation
            if ((id)===props.id){
                classString+=operationName
            }
            const up = () => update(id, operationName)
            setClassEl(classString)
            return operationName
        }

        let result =
            (tableArr.map(item =>
                        <tr className="td-border">
                        {tableArr.map(itemTd => (
                                <td id={itemTd.id+((item.id*10)-10)} key={item.id+((itemTd.id*10)-10)}
                                    className={(itemTd.id+((item.id*10)-10)) === props.id? classEl + props.operation:classEl}

                                    // onChange={itemTd.id+((item.id*10)-10)===props.id?
                                    //     () => handleArray(itemTd.id+((item.id*10)-10),props.operation.value):null}
                                >{(itemTd.id+((item.id*10)-10)) === props.id && props.ell?<img className="td-img" src={ellips} alt="ellips"/>:null}
                                </td>
                            ))
                        }
                        </tr>
                )
            )

        return result
    }


    return (
        <div>
            <table className="table">
                {table(array)}
            </table>
        </div>
    )
}