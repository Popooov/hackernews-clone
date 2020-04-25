import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeContext from '../contexts/theme'
import PropTypes from 'prop-types'

const activeStyle = {
    color: '#ff5722'
}

export default function Nav({ toggleTheme }) {

    const theme = React.useContext(ThemeContext)

    return (
        <div className='nav space-btw'>
            <ul className='nav-flex'>
                <li>
                    <NavLink 
                        className={`nav-link nav-link-${theme}`} exact to='/' 
                        activeStyle={activeStyle}
                    >
                        Top
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className={`nav-link nav-link-${theme}`} to='/new' 
                        activeStyle={activeStyle}
                    >
                        New
                    </NavLink>
                </li>
            </ul>
            <button
                style={{fontSize: 30}}
                className='btn-clear'
                onClick={toggleTheme}
            >
                {theme === 'light' ? '🌚' : '🌞'}
            </button>
        </div>
    )
}

Nav.propTypes = {
    toggleTheme: PropTypes.func.isRequired
}