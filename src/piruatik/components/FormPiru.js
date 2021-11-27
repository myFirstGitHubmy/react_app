import React, {useContext, useState} from 'react'
import {DatabaseContext} from "../../context/database/databaseContext";
import {VariableList} from "../../executant/components/VariableList";
import {AlertContext} from "../../context/alert/alertContext";
import {Alert} from "../../components/Alert";
import {Notes} from "../../components/Notes";
import {TableDefault} from "../../executant/components/fieldProgram/TableDefault";
import menuIcon from "../../resources/menu.png"
import {AsideMenu} from "../../executant/components/AsideMenu"
import h from "../../resources/h.png"
import {TableDinamic} from "../functions/TableDinamic";
import ell from "../../resources/ellips.png"
import angle from "../../resources/angle.png"
import line from "../../resources/line.png"
import stop from "../../resources/stop.png"
import color from "../../resources/color.png"
import {functions} from "../functions/initialTable"
import {images} from "../handbook/images"
import {
    angles,
    NINETY,
    FORTY_FIVE,
    ONE_HUNDRED_EIGHTY,
    ONE_HUNDRED_THIRTY_FIVE,
    THREE_HUNDRED_FIFTY,
    TWO_HUNDRED_TWENTY_FIVE,
    TWO_HUNDRED_SEVENTY,
    ZERO
} from "../handbook/angles";
import {stages} from "../handbook/stages"
import {UP, DOWN, LEFT, RIGHT, LEFT_UP, RIGHT_DOWN, RIGHT_UP, LEFT_DOWN} from "../handbook/steps"
import {LINE_UP, LINE_RIGHT, LINE_DIAGONAL, LINE_DOWN, LINE_LEFT, lines} from "../handbook/lines"
import {GREEN, RED, YELLOW, Colors} from "../handbook/colors"


export const Form = () => {

    const alert = useContext(AlertContext)
    const [isVisibleMenu,setVisibleMenu] = useState(false)
    const [currentPlace, setCurrentPlace] = useState(1)
    const [color,setColor] = useState(null)
    const [step, setStep] = useState(RIGHT)
    const [array, setArray] = useState(functions)
    const [ellipse, setEllipse] = useState(false)
    const [angle, setAngle] = useState(null)
    const [line, setLine] = useState(null)
    const [listActions,setListActions] = useState([])
    const [sizeList, setSizeList] = useState(0)

    const handlePaint = event => {
        const color = Array.from(event.target.selectedOptions,option => option.value)
        setColor(color[0])
        handleArrayColor(color[0])
    }

    const handleArrayLine = (line) => {
        const newArray = array
        for (let item of array){
            if (item.id === currentPlace){
                item.line = line
            }
        }
        setArray(newArray)
        addList(stages.SEGMENT.name + line)
    }

    const handleArrayAngle = (angle) => {
        const newArray = array
        for (let item of array){
            if (item.id === currentPlace){
                item.angle = angle
            }
        }
        setArray(newArray)
        addList(stages.ANGLE.name + angles.find(ang => ang.label === angle).code)
    }

    const handleArray = (...arg) => {
        const newArray = array
        for (let item of array){
            if (item.id === currentPlace){
                item = arg
            }
        }
        setArray(newArray)
    }

    const handleArrayEllipse = () => {
        const newArray = array
        for (let item of array){
            if (item.id === currentPlace){
                item.ellipse = true
            }
        }
        setArray(newArray)
        addList(stages.ELLIPSE.name)
    }

    const handleArrayColor = (color) => {
        const newArray = array
        for (let item of array){
            if (item.id === currentPlace){
                item.color = color
            }
        }
        setArray(newArray)
        addList(stages.COLOR.name + Colors.find(col => col.value === color).label)
    }

    const addList = (stage) => {
        setSizeList(sizeList+1)
        setListActions([...listActions, {id: sizeList, name: stage, place: currentPlace}])
        console.log(listActions)
    }

    const removeElementList = (id) =>{
        console.log("remove id: "+id)
        console.log(listActions)
        const list = []
        listActions
            .filter(item => item.id !== id)
            .map(elem => list.push(elem))
        console.log(list)
        setListActions(list)
    }

    return (
        <div className="container-lg d-flex flex-row border-radius-btn">
            <div className="menu">
                <div className="menu">
                    <button className="menu-btn" onClick={()=> setVisibleMenu(!isVisibleMenu)}><img className="menu img" src={menuIcon} alt="menu"/></button>
                </div>
                <AsideMenu isVisible={isVisibleMenu}/>
            </div>
            <div>
                <form>
                    <div className="right-row">
                        <div>
                            <h3 className=""><span className="badge badge-secondary form-margin-left">Действия</span></h3>
                            <div className="div-border form-margin-left-1 right-col">
                                <div className="div-margin-4 align-content-start right-col bd-highlight mb-3">
                                    <div>
                                        <button type="button" className="btn btn-outline-primary" onClick={
                                            () => {
                                                setCurrentPlace(currentPlace+step)
                                                setColor(null)
                                                addList(stages.STEP.name)
                                            }}>Шаг<img className="icon-h" src={images.ICON_STEP} alt=""/>
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => handleArrayEllipse()}>
                                            Эллипс <img className="icon-h" src={images.ICON_ELLIPSE} alt=""/>
                                        </button>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-outline-primary"
                                                data-toggle="modal" data-target="#exampleModalCorner">
                                            Направление<img className="icon-h" src={images.ICON_ANGLE} alt=""/>
                                        </button>

                                        <div className="modal fade" id="exampleModalCorner" tabIndex="-1" role="dialog"
                                             aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Угол</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="container">

                                                        <div className="modal-body">
                                                        </div>
                                                        <p>Выберите нужное направление</p>
                                                        <select id="selectorAngle" className="custom-select" onChange={event => {
                                                            const sel = Array.from(event.target.selectedOptions, option => option.value)[0]
                                                            setAngle(sel)
                                                            switch (sel){
                                                                case NINETY: {setStep(DOWN); break}
                                                                case FORTY_FIVE: {setStep(RIGHT_DOWN); break}
                                                                case ONE_HUNDRED_THIRTY_FIVE: {setStep(LEFT_DOWN); break}
                                                                case ONE_HUNDRED_EIGHTY: {setStep(LEFT); break}
                                                                case TWO_HUNDRED_TWENTY_FIVE: {setStep(LEFT_UP); break}
                                                                case TWO_HUNDRED_SEVENTY: {setStep(UP); break}
                                                                case THREE_HUNDRED_FIFTY: {setStep(RIGHT_UP); break}
                                                                case ZERO: {setStep(RIGHT); break}
                                                                default: setStep(RIGHT)
                                                            }
                                                            handleArrayAngle(sel)
                                                        }
                                                        }>
                                                            {angles.map(op =>
                                                                <option selected={op.selected} hidden={op.hidden} value={op.value}>{op.code}</option>)
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Сохранить</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="button" className="btn btn-outline-primary"
                                                data-toggle="modal" data-target="#exampleModalLine">
                                            Линия <img className="icon-h" src={images.ICON_LINE} alt=""/>
                                        </button>

                                        <div className="modal fade" id="exampleModalLine" tabIndex="-1" role="dialog"
                                             aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title"/>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="container">

                                                        <div className="modal-body">
                                                        </div>
                                                        <p>Выберите нужное действие</p>
                                                        <form id="selectLines" action="">
                                                            <select id="selectorLine" className="custom-select" onChange={event => {
                                                                const sel = Array.from(event.target.selectedOptions, option => option.value)[0]
                                                                console.log(lines)
                                                                lines
                                                                    .filter(lin => sel===lin.value)
                                                                    .map(obj => setLine(obj.value))
                                                                setLine(sel)
                                                                handleArrayLine(sel)
                                                            }
                                                            }>
                                                                {lines.map(op =>
                                                                    <option selected={op.selected} hidden={op.hidden} style={op.style} value={op.value}>
                                                                        {op.label}
                                                                    </option>)
                                                                }
                                                            </select>
                                                        </form>
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Сохранить</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div>
                                        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#examplePaint">
                                            Палитра <img className="icon-h" src={images.ICON_COLOR} alt=""/>
                                        </button>
                                        <div className="modal fade" id="examplePaint" tabIndex="-1" role="dialog"
                                             aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Цвет</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="container">
                                                        <div className="modal-body">
                                                            <select className="custom-select" onChange={e => handlePaint(e)}>
                                                                {Colors.map(col => <option hidden={col.hidden} selected={col.selected} value={col.value}>{col.label}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                                                        <button type="button" className="btn btn-primary" data-dismiss="modal">Сохранить</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => addList(stages.STOP)}>
                                            Стоп <img className="icon-h" src={images.ICON_STOP} alt=""/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        <h2><span className="badge badge-secondary form-margin-left">Рабочее поле</span></h2>
                            <div className="form-group form-margin-left">
                                <div className="div-margin-3 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                                    <div hidden>
                                        <TableDefault/>
                                    </div>
                                    <div>
                                        <TableDinamic id={currentPlace} line={line} operation={color} arrayList={array} handleArray={handleArray}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div id="program" className="div-border">
                <div className="div-margin-1"><span>Начало</span></div>
                <div className="div-margin-1">
                    {listActions!== null? listActions.map(item =>
                        <div className="div-margin-1">
                            {item.name}
                        </div>):null
                    }
                </div>
            </div>

            </div>

    )
}

setInterval(() => Form , 100)
