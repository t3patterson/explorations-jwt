const appName = `${window.location.hostname}_APP_TOKEN`
let cachedToken

function getToken(){
	if(!cachedToken){
		cachedToken = window.localStorage.getItem(appName)
	}
	return cachedToken
}

function setToken(token){
	cachedToken = token
	window.localStorage.setItem(appName, token)
}

function removeToken(){
	cachedToken = null
	window.localStorage.removeItem(appName)
}

function isAuthenticated(){
	return !!getToken()
}



module.exports = {
	getToken,
	setToken,
	isAuthenticated,
	removeToken	
}