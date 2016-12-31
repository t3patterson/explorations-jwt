import React from 'react'
import ReactDOM from 'react-dom'
import RegisterForm from './register-form.js'
import ForbiddenView from './forbidden.js'
import DashboardView from './dashboard.js'


const AppViewController = React.createClass({
   render: function(){
      return (
         <div>
            <h1>Welcome</h1>
				<RegisterForm/>
				<hr/>
				<ForbiddenView/>
         </div>
      )
   }
})



ReactDOM.render( <AppViewController/> ,document.querySelector('#app-container'))
