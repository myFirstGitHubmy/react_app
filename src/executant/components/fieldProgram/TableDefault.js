import React from "react";

export const TableDefault = () => {
    let array = new Array({id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6},{id: 7},{id: 8},{id: 9},{id: 10})
    const table = array =>
        (array.map(itemTr =>
                <tr className="td-border">
                    {array.map(item =>
                        <td id={item.id+((itemTr.id-1)*10)} className="td-border" key={(item.id+((itemTr.id-1)*10)).toString()}>

                        </td>
                    )}
                </tr>
        ))


    return (
        <div>
            <table className="table">
                {table(array)}
            </table>
        </div>
    )
}