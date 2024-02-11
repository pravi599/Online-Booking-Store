import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaBars, FaUserAlt, FaIdCard, FaList, FaPlusSquare, FaRegListAlt, FaMapMarkerAlt, FaUsers, FaListAlt,
  FaSignInAlt, FaSignOutAlt, FaMoneyBillAlt, FaDollarSign, FaRegFileAlt, FaHome
} from 'react-icons/fa';
import './Menu.css';

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setLoggedIn(false);
    navigate('/Login');
  };

  

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <div className="center-container">
        <div className="nav-links">
          <div className="menu-icon" onClick={toggleMenu}>
            <FaBars />
          </div>

          {isMenuOpen && (
            <>
              {!isLoggedIn ? (
                <NavLink to="/Login" className={`nav-link ${location.pathname === '/Login' ? 'active-link' : ''}`}>
                  <FaSignInAlt />Login
                </NavLink>
              ) : (
                <>
                  <NavLink to="/Home" className={`nav-link ${location.pathname === '/Home' ? 'active-link' : ''}`}>
                    <FaHome /> Home
                  </NavLink>


                  {userRole === 'User' && (
                    <>
                    <NavLink
                        to="/GetAllBooks"
                        className={`nav-link ${location.pathname === '/GetAllBooks' ? 'active-link' : ''}`}
                      >
                        Books
                      </NavLink>


                    
                    </>
                  )}

                  {userRole === 'Admin' && (
                    <>
                      <NavLink
                        to="/AddBook"
                        className={`nav-link ${location.pathname === '/AddBook' ? 'active-link' : ''}`}
                      >
                        Add Book
                      </NavLink>
                      <NavLink
                        to="/Books"
                        className={`nav-link ${location.pathname === '/Books' ? 'active-link' : ''}`}
                      >
                        Books
                      </NavLink>
                    </>
                  )}

                  <div className="nav-link logout-button" onClick={logout}>
                    <FaSignOutAlt /> Logout
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;