

const AppState = {
	_data: {
		isAuthenticated: false
	},

	setStore: function(storeProp, payload){
		this[storeProp] = payload
		if(typeof this.storeChangeCb === 'function') this.storeChangeCb()
	},

	onChange: function(cb){
	   console.log(cb)
		this.storeChangeCb = cb
	}
}

export default AppState