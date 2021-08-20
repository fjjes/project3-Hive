import logo from "../../images/hiveicon.png";
import {Nav, NavLink, Bars, NavMenu, NavBtnLink} from './NavbarElements';

const Navbar = () => {
  return (
    <div className="navbar">
      <Nav>
        <NavLink to='/'>
          <div className="admin-container-title-and-logo">
            <h1>Admin Portal</h1>
            <img src={logo} alt="Hive logo" className="admin-logo" />
          </div>
        </NavLink>
        <Bars />
        <NavMenu>
          {/* <NavLink to='/' activeStyle>Home</NavLink> */}
          <NavLink to='/create-new' activeStyle={{color:"#f59645"}}>Create New</NavLink>
          <NavLink to='/existing-surveys' activeStyle={{color:"#f59645"}}>Existing Surveys</NavLink>
          <NavLink to='/data-analysis' activeStyle={{color:"#f59645"}}>Data Analysis</NavLink>
          {/* <NavLink to='/data-visual' activeStyle={{color:"#f59645"}}>Data Visualization</NavLink> */}
          <NavBtnLink to='/'>Logout</NavBtnLink>
        </NavMenu>
      </Nav>
      </div>
  );
};

export default Navbar;