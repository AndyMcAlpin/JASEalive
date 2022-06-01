import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './assets/Header.css';
//import yeti from '../..assets/images/'
//import { ReactComponent as Logo } from '../assets/images/yeti.svg';

const Header = () => {
  const logout = event => {
    // toggleBurgerMenu();
    event.preventDefault();
    Auth.logout();
  };
  
  function toggleBurgerMenu() {
    document.querySelector('.navbar-menu').classList.toggle('is-active');
    // document.querySelector('.navbar-menu').classList.toggle('is-flex');
  }
 

  return (
    <header className=" bg-secondary mb-4 ">
      <nav className="is-fixed-top  align-center is-justify-content-space-between is-white is-flex">
        <div className='navbar-brand life_sherpa'>
            
            <Link to="/" className='navbar-item  '>
              <h1  id="title" className='has-text-black-bis is-size-1 is-size-4-mobile '>Life Sherpa</h1>
            </Link>
        </div>
        <div id="navBar2" className="navbar text-center navbar-end bg-secondary  ">
          <a role="button" className=" navbar-burger burger has-text-black-bis bg-secondary burger navbar-dropdown " aria-label="menu" aria-expanded="false" data-target="navbarBasic"
              onClick={toggleBurgerMenu}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
          </a>
          {Auth.loggedIn() ? (
            <>
            <div className='bg-secondary has-dropdown'>
              <div id="navbarBasic" className="navbar-menu bg-secondary is-expanded">
                
                  <Link to="/" className="navbar-item" onClick={toggleBurgerMenu}>Home</Link>
                  <Link to="/profile" className="navbar-item" onClick={toggleBurgerMenu}>Dashboard</Link>
                  <Link to="/board" className="navbar-item" onClick={toggleBurgerMenu}>Mentor Board</Link>
                  <Link to="/" className="navbar-item" onClick={logout}>Logout</Link>
                  {/* <Link to="/test" className="navbar-item " onClick={toggleBurgerMenu}>test</Link> */}
              </div>
            </div>
            </>
          ) : (
            <>
            <div id="navbarBasic" className="navbar-menu bg-secondary">
              {/* <Link to="/" className="navbar-item" onClick={toggleBurgerMenu}>Home</Link>
              <Link to="/profile" className="navbar-item" onClick={toggleBurgerMenu}>Dashboard</Link>
              <Link to="/board" className="navbar-item" onClick={toggleBurgerMenu}>Mentor Board</Link> */}
              <Link to="/login" className="navbar-item " onClick={toggleBurgerMenu}>Login</Link>
              <Link to="/signup" className="navbar-item " onClick={toggleBurgerMenu}>Signup</Link>
              {/* <Link to="/test" className="navbar-item " onClick={toggleBurgerMenu}>test</Link> */}
            </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
