import React, {useState} from "react";
import {THREE_HUNDRED_FIFTY, TWO_HUNDRED_SEVENTY, TWO_HUNDRED_TWENTY_FIVE, ONE_HUNDRED_EIGHTY,
        ONE_HUNDRED_THIRTY_FIVE, FORTY_FIVE, NINETY, ZERO}  from "../handbook/angles"
import {LINE_DIAGONAL, LINE_LEFT, LINE_DOWN, LINE_RIGHT, LINE_UP} from "../handbook/lines"
import {stages} from "../handbook/stages";
import {Colors} from "../handbook/colors";

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
            const isColor = cell.color !== null || cell.color !== ''
            // const isLine = cell.line !== null
            // const isLineNull = cell.line == null
            const isAngle = cell.angle !== null
            const line = cell.line
            const angle = cell.angle

            if (cell.ellipse) return null

            if (isColor && isAngle
                && line === LINE_DIAGONAL
                && (angle === FORTY_FIVE ||
                    angle === TWO_HUNDRED_TWENTY_FIVE ||
                    angle === ONE_HUNDRED_THIRTY_FIVE ||
                    angle === THREE_HUNDRED_FIFTY)) {
                console.log('triangle-' + angle + '-'+cell.color)
                return 'triangle-' + angle + '-' + cell.color
            }else if (isColor && line !== LINE_DIAGONAL){
                return cell.color
            }
        }

        function visibleHrAngleLineCell(cell){
            const hr = 'hr-'
            const line = cell.line
            const angle = cell.angle
            console.log(cell.color)
            if (cell.ellipse){
                return null
            }

            if ((angle === FORTY_FIVE || angle === TWO_HUNDRED_TWENTY_FIVE
                    || angle === ONE_HUNDRED_THIRTY_FIVE || angle === THREE_HUNDRED_FIFTY)
                && line === LINE_DIAGONAL){
                console.log(Colors.find(color => color.value === cell.color))
                if (Colors.find(color => color.value === cell.color) !== undefined &&
                    (cell.angle === ONE_HUNDRED_THIRTY_FIVE || cell.angle === THREE_HUNDRED_FIFTY)) {return (<hr className={hr+angle +' hr-color'}/>)}
                return (<hr className={hr+angle +' hr '}/>)
            }else if (line === LINE_RIGHT){
                return (<hr className={hr+ZERO}/>)
            }
            else if (line === LINE_UP){
                return (<hr className={hr+TWO_HUNDRED_SEVENTY}/>)
            }
            else if (line === LINE_LEFT){
                return (<hr className={hr+ONE_HUNDRED_EIGHTY}/>)
            }
            else if (line === LINE_DOWN){
                return (<hr className={hr+NINETY}/>)
            }
            else {
                return null
            }
        }

        function visibleBorder(cell){
            if (cell.id === props.id){
                return ' border_red_current'
            }else{
                return ' border_gray'
            }
        }

        function visibleEllipse(cell){
            let classString = ' box-border '
            if (cell.ellipse === true){
                classString+=stages.ELLIPSE.ident
                if (cell.color !== ''){
                    classString+='-'+cell.color

                }
                return <div className={classString}/>
            }
            return null
        }

        return (tableArr.map(item =>
                    <div className="right-row" key={item.id.toString()}>
                        {array
                            .filter(pair => (
                                            pair.id <= item.id && item.id === 10)
                                            || pair.id > item.id-10
                                            && pair.id <= (item.id) && item.id >=20)
                            .map(itemTd => (
                                    <div id={itemTd.id.toString()} key={itemTd.id.toString()}
                                        className={classEl + adaptiveColorForCell(itemTd) + visibleBorder(itemTd)}
                                        left={itemTd.left}
                                        right={itemTd.right}
                                        down={itemTd.down}
                                        up={itemTd.up}
                                        line={itemTd.line}
                                        angle={itemTd.angle}
                                        ellipse={itemTd.ellipse}
                                        color={itemTd.color}
                                    >{visibleHrAngleLineCell(itemTd)}
                                        {visibleEllipse(itemTd)}
                                    </div>
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


