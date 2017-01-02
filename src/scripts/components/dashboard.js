import React from 'react'
import {Link} from 'react-router'

import $ from 'jquery';
import * as AuthToken from '../services/authtoken'
import STORE from '../store.js'
import * as API_APP from '../services/api-app.js'



const DashboardView = React.createClass({
   _handleLogout: function(){
      AuthToken.removeToken()
		STORE.setStore('userAuthenticated', AuthToken.isAuthenticated() )
		location.hash = ''
   },

   componentDidMount: function(){
      API_APP.fetchData()
			.then(function(res){
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

