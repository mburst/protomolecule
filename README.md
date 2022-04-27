# Protomolecule

## Project Goals

The goal of this project is to provide a set of basic toolkits to get you started with just about any web app idea. All frontends are compatible with all backends. Each project supports first party registration/login, a home page, a user profile API, data validation, and error handling. This makes it easy to mix and match so that you can try new languages and frameworks to prototype projects with, without a ton of boilerplate, code bloat, or external dependencies.

Additional toolkits and improvements to the current toolkits are always welcome via pull request.

## Frontend

### User Flow

* On startup an API request to `/me` is made to fetch the user profile
  * A 200 loads the user data in to the UI
  * A 401 indicates the user is signed out
* On register an access token cookie is set so that future requests can be authed
  * The access token cookie is marked secure and http only so that the client does not have access to it
* On login an access token cookie is also set

### Requirements

* Support client side user input validation (HTML5 input validation is fine)
* Have a generic way to display an error such as a toast message
* `/`, `/login`, `/register` must all be routable with an appropriate UI for the later two

## Backend Endpoints

* `/me` - responds back with a JSON blob of the user object and refreshes the expiry on your access token. An invalid, expired, or empty access token responds back with a 401
* `/login/password` - supports first party email/password login and will set a secure access token cookie
  * Login is limited to a few devices to prevent someone from creating too many access tokens. Least recently used device tokens are deleted
* `/register/password` - creates a first party account with an email/password combination and will set a secure access token cookie
* `/logout` - requires a post request to prevent accidental logout via CSRF

### Requirements

* A way to validate user input is correct or respond with a 400
* A way to create a database and issue read/write queries
* Can safely hash and compare passwords for user authentication
* Support for CORS
* All response data lives at the root of the JSON response such as `{ "email": "max@example.com" }` and not behind a data property or the like
* Error responses take the form of `{ "message": "", "code": 0 }` where code is an identifier to the frontend for how to display the error message

## Similar Projects

* [TodoMVC](https://github.com/tastejs/todomvc) - Todo list reimplemented in multiple JavaScript frameworks
* [RealWorld](https://github.com/gothinkster/realworld) - Clone of Medium using various compatible frontend and backend frameworks