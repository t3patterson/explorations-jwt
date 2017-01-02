import $ from 'jquery'
import AuthToken from './authtoken.js'

export function fetchData(){
	return $.ajax({
			headers: {
				Authorization: AuthToken.getToken() ? `Bearer ${AuthToken.getToken()}` : ''
			},
			url: '/protected-data'
	})
}

