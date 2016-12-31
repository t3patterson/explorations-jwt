

const AppState = {
	_data: {
		userAuthenticated: false
	},

	setStore: function(storeProp, payload){
		this._data[storeProp] = payload
		if(typeof this.storeChangeCb === 'function') this.storeChangeCb()
	},

	onChange: function(cb){
	   console.log(cb)
		this.storeChangeCb = cb
	}
}

export default AppState