import React from "react";

export const functions = () => {
    const sizeTable = 100

    const initialTable = new Array(0)

    for (let i = 1; i <= sizeTable; i++){
        const left = i !== 1? i-1 : 1;
        const right = i !== sizeTable? i+1 : sizeTable;
        const down = i <= 90 ? i+10 : null;
        const up = i >= 11 ? i-10 : null;

        const initialStateTable = {
            id: i,
            color: '',
            left: left,
            right: right,
            down: down,
            up: up
        }

        initialTable.push(initialStateTable)
    }

    return initialTable

}
