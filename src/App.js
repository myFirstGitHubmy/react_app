import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Navbar} from "./components/Navbar";
import {Home} from "./pages/Home";
import {AlertState} from './context/alert/alertState'
import {DatabaseState} from "./context/database/databaseState";

function App() {
    return (
        <DatabaseState>
            <AlertState>
                <BrowserRouter>
                    <Navbar/>
                    <div className="container pt-3 col-lg-3 system-form">
                        <Home/>
                    </div>
                </BrowserRouter>
            </AlertState>
        </DatabaseState>
    );
}

export default App;
