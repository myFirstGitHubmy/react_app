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


export const Form = () => {

    const {commands,variables,  fetchCommands, removeVariables, fetchVariables,addCommands} = useContext(DatabaseContext)
    const alert = useContext(AlertContext)
    const [isVisibleMenu,setVisibleMenu] = useState(false)
    const [currentPlace, setCurrentPlace] = useState(1)
    const [operation,setOperation] = useState('')
    const [route, setRoute] = useState(1)
    const [array, setArray] = useState([{id: 1,color:''},{id: 2,color:''},{id: 3,color:''},{id: 4,color:''},{id: 5,color:''},{id: 6,color:''},{id: 7,color:''},{id: 8,color:''},{id: 9,color:''},{id: 10,color:''},
        {id: 11,color:''},{id: 12,color:''},{id: 13,color:''},{id: 14,color:''},{id: 15,color:''},{id: 16,color:''},{id: 17,color:''},{id: 18,color:''},{id: 19,color:''},{id: 20,color:''},
        {id: 21,color:''},{id: 22,color:''},{id: 23,color:''},{id: 24,color:''},{id: 25,color:''},{id: 26,color:''},{id: 27,color:''},{id: 28,color:''},{id: 29,color:''},{id: 30,color:''},
        {id: 31,color:''},{id: 32,color:''},{id: 33,color:''},{id: 34,color:''},{id: 35,color:''},{id: 36,color:''},{id: 37,color:''},{id: 38,color:''},{id: 39,color:''},{id: 40,color:''},
        {id: 41,color:''},{id: 42,color:''},{id: 43,color:''},{id: 44,color:''},{id: 45,color:''},{id: 46,color:''},{id: 47,color:''},{id: 48,color:''},{id: 49,color:''},{id: 50,color:''},
        {id: 51,color:''},{id: 52,color:''},{id: 53,color:''},{id: 54,color:''},{id: 55,color:''},{id: 56,color:''},{id: 57,color:''},{id: 58,color:''},{id: 59,color:''},{id: 60,color:''},
        {id: 61,color:''},{id: 62,color:''},{id: 63,color:''},{id: 64,color:''},{id: 65,color:''},{id: 66,color:''},{id: 67,color:''},{id: 68,color:''},{id: 69,color:''},{id: 70,color:''},
        {id: 71,color:''},{id: 72,color:''},{id: 73,color:''},{id: 74,color:''},{id: 75,color:''},{id: 76,color:''},{id: 77,color:''},{id: 78,color:''},{id: 79,color:''},{id: 80,color:''},
        {id: 81,color:''},{id: 82,color:''},{id: 83,color:''},{id: 84,color:''},{id: 85,color:''},{id: 86,color:''},{id: 87,color:''},{id: 88,color:''},{id: 89,color:''},{id: 90,color:''},
        {id: 91,color:''},{id: 92,color:''},{id: 93,color:''},{id: 94,color:''},{id: 95,color:''},{id: 96,color:''},{id: 97,color:''},{id: 98,color:''},{id: 99,color:''},{id: 100,color:''}])
    const [ellips, setEllips] = useState(false)
    const handlePaint = event => {
        const oper = Array.from(event.target.selectedOptions,option => option.value)
        setOperation(oper)
    }

    const handleArray = (id,color) => {
        if (color === null){
            color = null
        }else{
            const arr = array
            setArray(arr)
        }
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
                <div className="form-margin-left" hidden>
                    <VariableList array={variables} onRemove={removeVariables}/>
                </div>

                <form>
                    <h2><span className="badge badge-secondary form-margin-left">Рабочее поле</span></h2>
                    <div className="form-group form-margin-left">
                        <div className="div-margin-3 align-content-start flex-nowrap d-flex flex-row bd-highlight mb-3">
                            <div hidden>
                                <TableDefault/>
                            </div>
                            <div>
                                <TableDinamic id={currentPlace} ell={ellips} operation={operation} array={array} handleArray={handleArray}/>
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
                                        addCommands({name: 'Шаг', ident: 'STEP'})
                                        fetchCommands()
                                        setOperation('')
                                    }}>
                                   Шаг <img className="icon-h" src={h} alt=""/>
                                </button>

                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary" onClick={
                                    () => {
                                        addCommands({name: 'Отрезок', ident: 'SECTION'})
                                        fetchCommands()
                                    }}>
                                    Отрезок <img className="icon-h" src={line} alt=""/>
                                </button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary" onClick={
                                    () => {
                                        addCommands({name: 'Эллипс', ident: 'ELLIPSE'})
                                        fetchCommands()
                                        setEllips(true)
                                    }}>
                                    Эллипс <img className="icon-h" src={ell} alt=""/>
                                </button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary" onClick={
                                    () => {
                                        addCommands({name: 'Поворот', ident: 'TURN'})
                                        fetchCommands()
                                    }}
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
                                                <select className="custom-select" onChange={event => {
                                                    const sel = Array.from(event.target.selectedOptions, option => option.value)
                                                    if (sel==='45'){
                                                        setCurrentPlace(currentPlace+1-10)
                                                        console.log(currentPlace)
                                                    }else{
                                                        setCurrentPlace(currentPlace+10)
                                                        console.log(currentPlace)
                                                    }
                                                }
                                                }>
                                                        <option selected value="45">
                                                            45
                                                        </option>
                                                    <option value="90">90</option>
                                                </select>
                                            </div>

                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={() => {
                                                    fetchCommands()
                                                }} data-dismiss="modal">Отмена</button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal">Сохранить</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#examplePaint" onClick={
                                    () => {
                                        addCommands({name: 'Закрась', ident: 'PAINT'})
                                        fetchCommands()
                                    }}>
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
                                                        <option selected value="red">Красный</option>
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
                                <button type="button" className="btn btn-outline-primary" onClick={
                                    () => {
                                        addCommands({name: 'Стоп', ident: 'STOP'})
                                        fetchCommands()
                                    }}>
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


