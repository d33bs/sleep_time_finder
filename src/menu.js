import {Link} from 'react-router-dom'
import React from 'react';
import HomeIcon from 'react-icons/lib/fa/bed'
import AddDayIcon from 'react-icons/lib/fa/info-circle'

//menu content
export const Menu = () =>
    <nav className="menu">
        <Link to="/projects/sleep_time_finder" className="menu_left"><HomeIcon /></Link>
        <Link to="/projects/sleep_time_finder/about" className="menu_right"><AddDayIcon /></Link>
    </nav>