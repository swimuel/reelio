import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../../assets/reelio_logo.png'
class Header extends Component {
  render () {
    return (
      <div className={'header'}>
        <Link to='/'><img src={logo} alt={'reelio logo'} /></Link>
      </div>
    )
  }
}

export default Header
