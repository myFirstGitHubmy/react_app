import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
            <div className="navbar-brand">
                App
            </div>

            <ul className="navbar-nav row d-flex flex-row container-lg">
                <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/"
                        exact
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        className="nav-link"
                        to="/pir"

                    >
                        Пируэтик
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
