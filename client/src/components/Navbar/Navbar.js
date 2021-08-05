import React from 'react';
// import logo from '../../images/hivetagline2.png'
import {Nav, NavLink, Bars, NavMenu, NavBtnLink} from './NavbarElements';

const Navbar = () => {
  return (
    <div className="navbar">
      <Nav>
        {/* <NavLink to='/'>
          <img src={logo} alt="logo"  style={{ width:'50%', alignItems:'flex-start'}}/>
        </NavLink> */}
        <Bars />
        <NavMenu>
          {/* <NavLink to='/' activeStyle>Home</NavLink> */}
          <NavLink to='/create-new' activeStyle={{color:"#f59645"}}>Create New</NavLink>
          <NavLink to='/find-list' activeStyle={{color:"#f59645"}}>Find Surveys</NavLink>
          <NavLink to='/data-visual' activeStyle={{color:"#f59645"}}>Data Visualization</NavLink>
          <NavBtnLink to='/sign-out'>Sign out</NavBtnLink>
        </NavMenu>
      </Nav>
    </div>
  );
};

export default Navbar;