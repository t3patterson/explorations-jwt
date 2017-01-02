import $ from 'jquery'

export const login = function (submission){
	return $.ajax({
		method: 'POST',
		url:  '/auth/login',
		headers : {
			"Content-Type" : 'application/json'
		},
		data: JSON.stringify(submission)
	})
} 


export const register = function (submission){
	return $.ajax({
		method: 'POST',
		url:  '/auth/register',
		headers : {
			"Content-Type" : 'application/json'
		},
		data: JSON.stringify(submission)
	})
} 