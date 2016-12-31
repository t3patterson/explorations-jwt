import React from 'react';
import $ from 'jquery';
import * as Auth from '../services/authtoken'
import STORE from '../store.js'

const RegisterForm = React.createClass({
   _handleSubmit: function(evt){
      evt.preventDefault()
      let submission = {
         email: evt.target.email.value ,
         password: evt.target.password.value
      }
		
		$.ajax({
			method: 'POST',
			url: '/auth/register',
			headers : {
				"Content-Type" : 'application/json'
			},
			data: JSON.stringify(submission)
		}).then(function(res){
			console.log('awesome, saved')
			console.log(res)
			Auth.setToken(res.token)
			STORE.setStore('isAuthenticated', Auth.isAuthenticated() )
		}).fail(function(err){
         console.log(err)
      })
   },

   render: function(){
      return (
         <form className="grid-container form-group" onSubmit={this._handleSubmit}>
				 <div className="sm-3-of-12"></div>
             <div className="form-field sm-6-of-12">
			       <label> Email </label>
			       <input type="text"  name="email"/>
			    </div>
				<div className="sm-3-of-12"></div>
				 
				 <div className="sm-3-of-12"></div>

				 <div className="form-field sm-6-of-12">
			       <label> Password </label>
			       <input type="password" name="password"/>
			    </div>
				 <div className="sm-3-of-12"></div>
           	 
             <div className="sm-3-of-12"></div>
             <div className="sm-6-of-12 md-6-of-12 form-field">
                <input type="submit" className="btn md primary" value="submit" / >
             </div>
         </form>
      )
   }
})

export default RegisterForm

