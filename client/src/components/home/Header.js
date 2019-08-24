import React, { Component } from 'react'
import './Home.css'
import logo from './reelio_logo.png'
class Header extends Component{
    render() {
        return (
            <div className={"header"}>
                <img src={logo} alt={"reelio logo"}/>
            </div>
        )
    }
}

export default Header