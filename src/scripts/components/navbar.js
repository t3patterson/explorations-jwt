import React from 'react'
import {Link} from 'react-router'
import $ from 'jquery';
import * as Auth from '../services/authtoken'
import STORE from '../store.js'

const NavBar = React.createClass({
  
   render: function(){
      return (
         <nav className="nav-bar">
 
			    <input type="checkbox" className="hamburger-toggler"/>

			    <div className="hamburger-menu">
			      <span className="line"></span>
			      <span className="line"></span>
			      <span className="line"></span>
			    </div>

			    <div className="nav-list">
					 <Link to="/">Home</Link>
			       <Link to="/dashboard">Dashboard</Link>
          		 <Link to="/register">Register</Link>
                <Link to="/login">Log In</Link>

			    </div>

			</nav>
      )
   }
})

export default NavBar

