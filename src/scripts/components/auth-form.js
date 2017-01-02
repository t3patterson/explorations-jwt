import React from 'react';
import $ from 'jquery';
import * as AuthToken from '../services/authtoken'
import STORE from '../store.js'
import * as API_AUTH from '../services/api-auth.js'

const AuthForm = React.createClass({
   _handleSubmit: function(evt){
      evt.preventDefault()
      let submission = {
         email: evt.target.email.value ,
         password: evt.target.password.value
      }

		let getToken
      if (this.props.route.path === 'register') getToken = API_AUTH.register(submission)
		if (this.props.route.path === 'login') getToken = API_AUTH.login(submission)

		getToken.then(function(res){
			console.log('awesome, saved')
			console.log(res)
			AuthToken.setToken(res.token)
			STORE.setStore('userAuthenticated', AuthToken.isAuthenticated() )
		}).fail(function(err){
         console.log(err)
      })
   },

   render: function(){
		let currentRouterPath = this.props.route.path
      let formConfig = {
         formTitle: "Log In",
			loginBtnClass : "btn md"
      }
      if(currentRouterPath === 'register'){
         formConfig =   {
            formTitle: "Sign Up",
				loginBtnClass : "btn md primary"
         }
      }
      return (
         <div>
            <h3 className="txt-center">{formConfig.formTitle}</h3>
            <form className="grid-container form-group" onSubmit={this._handleSubmit}>
   				 <div className="sm-3-of-12"></div>
                <div className="form-field sm-6-of-12">
   			       <label> Email </label>
   			       <input type="text" name="email"/>
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
                   <input type="submit" className={formConfig.loginBtnClass} value="Submit" / >
                </div>
            </form>
         </div>
      )
   }
})

export default AuthForm

