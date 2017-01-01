import React from 'react'

const ForbiddenView = React.createClass({
	render: function(){
		return <section className="segment bg-fail"><h1>Sorry You don't have access to that!</h1></section>
	}
})

export default ForbiddenView

