const crypto = require('crypto')

function _base64Encode(str){
	return Buffer.from(str, 'utf8').toString('base64')
}

function _base64Decode(str){
	return Buffer.from(str, 'base64').toString('utf8')
}


function _sign(jwtContents, key){
	return crypto.createHmac('sha256', key).update(jwtContents).digest('base64')
}

function encodeJwt(payload, secret){
	let header = {
		typ : 'JWT',
		alg: 'HS256',
	}

	//header.payload.signature
	let jwtHeader =  _base64Encode(JSON.stringify(header))
	let jwtPayload = _base64Encode(JSON.stringify(payload))
	let jwtSignature = _sign(`${jwtHeader}.${jwtPayload}`, secret)
   let jwt = `${jwtHeader}.${jwtPayload}.${jwtSignature}`
	return jwt
}


function decodeJwt(token, secret){
	let segments = token.split('.');
	if (segments.length !== 3) 
		throw new Error('token structure not correct');
	let header = JSON.parse(_base64Decode(segments[0]))
	let payload = JSON.parse(_base64Decode(segments[1]))
	let signature = segments[2]

	let rawContents = `${segments[0]}.${segments[1]}`
	if(!_verify(rawContents, 'shhh...', signature )) 
		throw new Error('verification FAILED')
	
	return payload
	
}

function _verify(rawContents, secret, signature){
	return signature === _sign(rawContents, 'shhh...')
}

module.exports = { encodeJwt, decodeJwt  }