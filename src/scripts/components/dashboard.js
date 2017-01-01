import React from 'react'
import $ from 'jquery';
import * as Auth from '../services/authtoken'
import STORE from '../store.js'

const DashboardView = React.createClass({
   _handleLogout: function(){
      Auth.removeToken()
		STORE.setStore('userAuthenticated', Auth.isAuthenticated() )
   },

   componentDidMount: function(){
			console.log("???")

		$.ajaxSetup({
			beforeSend: function (xhr) {
				let authHeader = Auth.getToken() ? `Bearer ${Auth.getToken()}` : ''
				xhr.setRequestHeader('Authorization', authHeader);
			}
		})
      $.ajax({
				url: '/protected-data'
      }).then(function(res){
			console.log('success!')
			console.log(res)
		}).fail(function(err){
			console.log('FAIL')
			console.log(err)
		})
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

