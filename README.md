# node auth

A simple api with jwt authentication.

#install
* npm install

# run
* grunt

# tests & reports
* grunt build 

#api methods

  * GET - api/todos - Get all todos
  * GET - api/todos/:id - Get todo by id
  * UPDATE - api/todos/:id - Update todo by id (Authorized Request)
  * DELETE - api/todos/:id - Detele todo by id (Authorized Request)
  * POST - api/todos - Create new Todo (Authorized Request)
  * POST - api/auth/register - Register new user
  * POST - api/auth/login - login credentials (username, password) returns the Json web token for authorized requests
  
* Authorized Requests
    * Set Authentication header to - "Authentication: JWT (generated token)"


#Todos
* Create unit tests
* Create integration tests
* Improve grunt file
