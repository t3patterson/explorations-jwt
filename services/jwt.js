const crypto = require('crypto')
// let {encode} = require('jwt-simple');


function _base64Encode(str){
	return Buffer.from(str, 'utf8').toString('base64')
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

module.exports = { encodeJwt  }