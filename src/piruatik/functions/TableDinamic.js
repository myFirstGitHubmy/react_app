import React, {useState} from "react";
import ellips from "../../resources/ellipse.png"

export const TableDinamic = (props, {handleArray}) => {
    let tableArr = [{id: 10},{id: 20},{id: 30},{id: 40},{id: 50},{id: 60},{id: 70},{id: 80},{id: 90},{id: 100}]
    const [classEl, setClassEl] = useState('box-border ')

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

        function adaptiveColorForCell(cell) {
            const isColor = cell.color !== ''
            const isAngle = cell.angle !== null
            const isAngleNull = cell.angle == null

            if (isColor && isAngle) {
                console.log('triangle-45-'+cell.color)
                return 'triangle-45-'+cell.color
            }else if (isColor && isAngleNull){
                return cell.color
            }
        }

        return (tableArr.map(item =>
                    <div className="right-col">
                        {array
                            .filter(pair => (
                                            pair.id <= item.id && item.id === 10)
                                            || pair.id > item.id-10
                                            && pair.id <= (item.id) && item.id >=20)
                            .map(itemTd => (
                                    <div id={itemTd.id.toString()} key={itemTd.id.toString()}
                                        className={classEl + adaptiveColorForCell(itemTd)}
                                        left={itemTd.left}
                                        right={itemTd.right}
                                        down={itemTd.down}
                                        up={itemTd.up}
                                        angle={itemTd.angle}
                                        // onChange={itemTd.id+((item.id*10)-10)===props.id?
                                        //     () => handleArray(itemTd.id+((item.id*10)-10),props.operation.value):null}
                                    />
                            )
                        )
                        }
                    </div>
            )
        )
    }


    return (
        <div>
            {/*<table className="table">*/}
                {table(props.arrayList)}
            {/*</table>*/}
        </div>
    )
}


