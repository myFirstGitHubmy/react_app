import React, {createElement, useContext, useState} from "react";
import ReactDOM from "react-dom";
import ellips from "../../../resources/ellipse.png"

export const TableDinamic = (props, {handleArray}) => {
    let tableArr = new Array({id: 0},{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6},{id: 7},{id: 8},{id: 9})
    const [classEl, setClassEl] = useState('td-border ')
    console.log(props.id)

    const table = (array) =>{
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
                        {array.filter(pair => pair.id >= item.id*10 && pair.id < (item.id*10+10)).map(itemTd => (
                                <td id={itemTd.id.toString()} key={itemTd.id.toString()}
                                    className={classEl + itemTd.color}
                                    left={itemTd.left}
                                    right={itemTd.right}
                                    down={itemTd.down}
                                    up={itemTd.up}
                                    // onChange={itemTd.id+((item.id*10)-10)===props.id?
                                    //     () => handleArray(itemTd.id+((item.id*10)-10),props.operation.value):null}
                                >
                                    {(itemTd.id+((item.id*10)-10)) === props.id && props.ell?
                                    <img className="td-img" src={ellips} alt="ellips"/>
                                    :null}
                                </td>
                            ))
                        }
                        </tr>
                )
            )

        // console.log(result)
        return result
    }


    return (
        <div>
            <table className="table">
                {table(props.arrayList)}
            </table>
        </div>
    )
}


