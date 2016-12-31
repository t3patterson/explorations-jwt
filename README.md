# JWT

### What is a JWT?
JSON Web Token

Contains: 
+ Header
+ Payload
+ Signature

Process:
1. Client Logs In
  + email & password are validated. 
  + payload(userid + misc info) is encoded against a secret. 
  + send JWT to client
2. Client Gets JOT
  + stores in browser local storage
  + client is authenticated as long as it has a JWT
3. Client requests resource
  + puts the JWT in the header of the requests
  + server receives, parses header, decodes the JWT
  + server knows who the client is & sends resource

### Advantages of JWTs
+ very light weight
+ no server state set with cookies in memory or in db
+ no db lookup to determine who the user is or when the JWT expires
+ mobile-ready
+ no CORS issues

