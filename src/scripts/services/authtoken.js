let appName = `${window.location.hostname}_APP`

function getToken(){
	return window.localStorage.getItem(appName)
}

function setToken(token){
	window.localStorage.setItem(appName, token)
}

function isAuthenticated(){
	return !!getToken()
}

module.exports = {
	getToken,
	setToken,
	isAuthenticated
}