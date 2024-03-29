import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import {Navbar} from "./components/Navbar";
import {Home} from "./executant/pages/Home";
import {AlertState} from './context/alert/alertState'
import {DatabaseState} from "./context/database/databaseState";
import {Form} from "./piruatik/components/FormPiru"

export default function App() {
    return (
        <DatabaseState>
            <AlertState>
                <BrowserRouter>
                    <Navbar/>
                    <div className="container pt-3 col-lg-3 system-form">
                        <Route exact path="/" component={Home}/>
                        <Route path="/pir" component={Form}/>
                    </div>
                </BrowserRouter>
            </AlertState>
        </DatabaseState>
    );
}
