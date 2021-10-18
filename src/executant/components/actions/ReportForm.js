import React, {useContext, useState, useEffect} from "react";
import {DatabaseContext} from "../../../context/database/databaseContext";
import ReactDom from 'react-dom'
import {RequestForm} from "./RequestForm";
import {REPORT} from "../../../context/identTypes"

export const ReportForm = () => {

    const {commands,addCommands,fetchCommands} = useContext(DatabaseContext)
    const [selectedOption, setSelectedOption] = useState([])
    const [valueSelected, setValueSelected] = useState('')
    const [radio, setRadio] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => {
        fetchCommands()
    },[])

    const saveVariable = () => {
        let obj = null
        if (radio){
            obj = {
                name: 'Сообщить '+ value ,
                ident: REPORT,
                nameVariable: value,
                valueVariable: null,
                status: true
            }
        }else{
            obj = {
                name: 'Сообщить '+ selectedOption ,
                ident: REPORT,
                nameVariable: selectedOption,
                valueVariable: valueSelected,
                status: true
            }
        }
        addCommands(obj)
    }

    const handleChangeReport = (event) => {
        const val = Array.from(event.target.selectedOptions, option => option.value)
        console.log(val)
        const mas = val[0].split(' ')
        setSelectedOption(mas[0])
        setValueSelected(mas[1])
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLongReport">
                Сообщить ...
            </button>
            <div className="modal fade" id="exampleModalLongReport" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Сообщить</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="checkbox"
                                               // onSelect={radio}
                                               onChange={() => setRadio(!radio)} aria-label="Checkbox for following text input"/>
                                    </div>
                                </div>
                                <input type="text" id="report" placeholder="Введите строку" className="form-control" onChange={e => setValue(e.target.value)} disabled={!radio} aria-label="Text input with checkbox"/>
                                {radio === false ? <div className="container div-margin-1">

                                    <select className="custom-select" onChange={handleChangeReport}>
                                        {Object.keys(commands).filter(com => commands[com].status === true).map(item =>
                                            <option value={commands[item].nameVariable + ' '+ commands[item].valueVariable} key={item}>
                                                {
                                                    commands[item].nameVariable
                                                }
                                            </option>
                                        )}
                                    </select>

                                </div>: null}

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => {
                                setSelectedOption('')
                            }} data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-primary" onClick={saveVariable} data-dismiss="modal" >Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ReactDom.render(
    RequestForm,
    document.getElementById('root')
)