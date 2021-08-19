import logo from "../../images/hiveicon.png";
import {Nav, NavLink, Bars, NavMenu, NavBtnLink} from './NavbarElements';
// import "./AdminPortal.css";
import useWindowSize from "../../utilities/useWindowSize"

const Navbar = () => {
  const {width} = useWindowSize();

  return (
    <div>
      {width > 300 && (
    <div className="navbar">
      <Nav>
        <NavLink to='/'>
					<h1 style={{color: "white", width: "200px"}}>Admin Portal</h1>
					<img src={logo} alt="Hive logo" className="admin-logo" />
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
      )}
    </div>
  );
};

export default Navbar;