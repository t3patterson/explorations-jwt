import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

const AppViewController = React.createClass({
   render: function(){
      return (
         <div>
            <h1>Hellooo</h1>
         </div>
      )
   }
})

ReactDOM.render( <AppViewController/> ,document.querySelector('#app-container'))
