import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory, IndexRoute, Redirect } from 'react-router';
import AuthForm from './components/auth-form.js';
import ForbiddenView from './components/forbidden.js';
import DashboardView from './components/dashboard.js';
import Navbar from './components/navbar.js';

import STORE from './store.js';
import * as Auth from './services/authtoken';



const AppViewController = React.createClass({
	getInitialState: function(){
    	console.log(Auth.isAuthenticated())
		STORE.setStore('userAuthenticated', Auth.isAuthenticated())
		console.log(Auth.isAuthenticated())
		return STORE._data
	},

	componentDidMount: function(){
		let component = this
		STORE.onChange(function(){
			component.setState(STORE._data)
		})
	},

   render: function(){
		// console.log( Auth.getToken() , Auth.isAuthenticated())
	   // console.log(this.state.userAuthenticated)
      return (
         <div>
            <Navbar/>
				<hr/>
				<div className="container-narrow">
					{this.props.children }
				</div>
         </div>
      )
   }
})

const HomeView = React.createClass({
	render: function(){
		return (
			<section className="segment">
				<h1>Welcome to the jwt party</h1>
				<img src="https://unsplash.it/800/400?image=332" style={{display: 'block', width: '100%'}}></img>
			</section>
		)
	}
})

const View404 = React.createClass({
	render: function(){
		return (<section className="segment">
			<h1>Nothing found at this extension</h1>
			<p>Perhaps you'd like to go <Link to="/">home</Link></p>
		</section>)
	}
})

const AppRouter = function(){
	return(
	<Router history={hashHistory}>
		 <Route path="/" component={AppViewController}>
		    <IndexRoute component={HomeView}/>
			 <Route path="dashboard" component={DashboardView}/>
			 <Route path="register" component={AuthForm}/>
			 <Route path="login" component={AuthForm}/>
			 <Route path='/forbidden' component={ForbiddenView} />
			 <Route path='/404' component={View404} />
			 <Redirect from='*' to='/404' />
		 </Route>
	</Router>
	)
}


ReactDOM.render( <AppRouter/> ,document.querySelector('#app-container'))
