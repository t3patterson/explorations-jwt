import React from 'react'
import {Link} from 'react-router'

import $ from 'jquery';
import * as Auth from '../services/authtoken'
import STORE from '../store.js'

const DashboardView = React.createClass({
   _handleLogout: function(){
      Auth.removeToken()
		STORE.setStore('userAuthenticated', Auth.isAuthenticated() )
		location.hash = ''
   },

   componentDidMount: function(){
      $.ajax({
				headers: {
					Authorization: Auth.getToken() ? `Bearer ${Auth.getToken()}` : ''
				},
				url: '/protected-data'
      }).then(function(res){
			console.log('success!')
			console.log(res)
		}).fail(function(err){
			console.log('FAIL')
			console.log(err)
			location.hash = "/forbidden"
		})
   },

   render: function(){
      return (
         <section className="segment bg-success">
            <div className="grid-container">
   			   <h2>Hallo, Dashboard!!!</h2>
   			</div>
            <button className="btn sm bg-fail" onClick={this._handleLogout}>Logout</button>
			
         </section>
      )
   }
})

export default DashboardView

