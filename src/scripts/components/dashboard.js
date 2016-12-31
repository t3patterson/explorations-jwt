import React from 'react'
import $ from 'jquery';
import * as Auth from '../services/authtoken'
import STORE from '../store.js'

const DashboardView = React.createClass({
   _handleLogout: function(){
      Auth.removeToken()
		STORE.setStore('userAuthenticated', Auth.isAuthenticated() )
   },

   render: function(){
      return (
         <div>
            <div className="grid-container bg-success">
   			   <h2>Hallo, Dashboard!!!</h2>
   			</div>
            <button className="btn sm bg-fail" onClick={this._handleLogout}>Logout</button>

         </div>
      )
   }
})

export default DashboardView

