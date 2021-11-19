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
import {TableDinamic} from "../../executant/components/fieldProgram/TableDinamic";
import ell from "../../resources/ellips.png"
import angle from "../../resources/angle.png"
import line from "../../resources/line.png"
import stop from "../../resources/stop.png"
import color from "../../resources/color.png"
import {functions} from "../functions/initialTable"
import {options, NINETEEN, FORTY_FIVE} from "../functions/options";



export const Form = () => {

    // const {commands,variables,  fetchCommands, removeVariables, fetchVariables,addCommands} = useContext(DatabaseContext)
    const alert = useContext(AlertContext)
    const [isVisibleMenu,setVisibleMenu] = useState(false)
    const [currentPlace, setCurrentPlace] = useState(1)
    const [operation,setOperation] = useState('')
    const [route, setRoute] = useState(1)
    const [array, setArray] = useState(functions)
    const [ellips, setEllips] = useState(false)
    const [option, setOption] = useState(options)

    const handlePaint = event => {
        const color = Array.from(event.target.selectedOptions,option => option.value)
        setOperation(color[0])
        handleArray(color[0])
    }

    const handleArray = (color) => {
        const newArray = array
        for (let item of array){
            if (item.id === currentPlace){
                item.color = color
            }
        }
        setArray(newArray)
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
                    <h2><span className="badge badge-secondary form-margin-left">Рабочее поле</span></h2>
                    <div className="form-group form-margin-left">
                        <div className="div-margin-3 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                            <div hidden>
                                <TableDefault/>
                            </div>
                            <div>
                                <TableDinamic id={currentPlace} ell={ellips} operation={operation} arrayList={array} handleArray={handleArray}/>
                            </div>
                        </div>

                    </div>

                    <h3 className=""><span className="badge badge-secondary form-margin-left">Действия</span></h3>
                    <div className="div-border form-margin-left-1">
                        <div className="div-margin-4 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                            <div>
                                <button type="button" className="btn btn-outline-primary" onClick={
                                    () => {
                                        setCurrentPlace(currentPlace+route)
                                        setOperation('')
                                        console.log(currentPlace)
                                    }}>
                                   Шаг <img className="icon-h" src={h} alt=""/>
                                </button>

                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary">
                                    Отрезок <img className="icon-h" src={line} alt=""/>
                                </button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary">
                                    Эллипс <img className="icon-h" src={ell} alt=""/>
                                </button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary"
                                        data-toggle="modal" data-target="#exampleModalCorner">
                                    Поворот <img className="icon-h" src={angle} alt=""/>
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
                                                <p>Выберите нужный угол поворота</p>
                                                <select id="selectorAngle" className="custom-select" onChange={event => {
                                                    const sel = Array.from(event.target.selectedOptions, option => option.value)
                                                    if (sel[0] === NINETEEN){
                                                        const position = array.filter(i => i.id === currentPlace).map(item => item.down)
                                                        setCurrentPlace(position[0]-1)

                                                    }else{
                                                        setCurrentPlace(currentPlace+10)
                                                        console.log(currentPlace)
                                                    }
                                                }
                                                }>
                                                    {option.map(op =>
                                                    <option selected={op.selected} value={op.value}>{op.label}</option>)
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
                                <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#examplePaint">
                                    Закрась <img className="icon-h" src={color} alt=""/>
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
                                                    <select onChange={e => handlePaint(e)}>
                                                        <option selected value=""> </option>
                                                        <option value="red">Красный</option>
                                                        <option value="green">Зеленый</option>
                                                        <option value="yellow">Желтый</option>
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
                                <button type="button" className="btn btn-outline-primary">
                                    Стоп <img className="icon-h" src={stop} alt=""/>
                                </button>
                            </div>
                        </div>




                    </div>
                    <div className="container-lg d-flex flex-row border-radius-btn">

                    </div>


                </form>
            </div>
            <div id="program" className="div-border">
                <div className="div-margin-1"><span>Начало</span></div>
                    {/*<Notes notes={commands}/>*/}
            </div>
            </div>

    )
}

setInterval(() => Form , 100)
