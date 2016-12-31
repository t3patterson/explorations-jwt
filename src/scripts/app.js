import React from 'react'
import ReactDOM from 'react-dom'
import RegisterForm from './components/register-form.js'
import ForbiddenView from './components/forbidden.js'
import DashboardView from './components/dashboard.js'
import STORE from './store.js'
import * as Auth from './services/authtoken'



const AppViewController = React.createClass({
	getInitialState: function(){
		STORE.setStore('isAuthenticated', Auth.isAuthenticated())
		return STORE._data
	},

	componentDidMount: function(){
		let component = this
		STORE.onChange(function(){
			component.setState(STORE._data)
		})
	},

   render: function(){
		console.log( Auth.getToken() )
      return (
         <div>
            <h1>Welcome</h1>
				<RegisterForm/>
				<hr/>
				{ this.state.isAuthenticated ? <DashboardView/> : <ForbiddenView/>}
         </div>
      )
   }
})



ReactDOM.render( <AppViewController/> ,document.querySelector('#app-container'))
