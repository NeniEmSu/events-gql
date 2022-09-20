# Events app

Create a GraphQL server (front end is not required for time purposes, but if you want go ahead)

Use Typescript, Common any GraphQL libraries but explain why you have made your choices.

document how to serve it, databases are not required but if needed document how to run them.

submit results to a github repo. If you have made any restrictions for the sake of time, explain what you would have done more if you had more time

- [x] create a GraphQL endpoint that validates  a password / username login.
  - [x] user has two different scopes, **admin** and **user**
  - [x] returns JWT
- [x] Make a graphql query argument that returns one or may **events**
  - [x] Some fields (say **price** or **capacity**) are hidden if the user scope is not admin
  - [x] the rest of the fields are available for all

- [x] authentication is JWT processed from the header

## .env sample file

```env
PORT=4000

DB_CONNECTION=mysql|pg
DB_HOST=localhost
DB_PORT=3306\5432
DB_DATABASE=events
DB_USERNAME=root\postgres
DB_PASSWORD=

NODE_ENV=development

ACCESS_TOKEN_SECRET=something-hard-to-guess
REFRESH_TOKEN_SECRET=something-hard-to-guess
```

## How to run the project

- clone the project
- install deps `npm i` and if any issues with install run `npm i --legacy-peer-deps`
- create a `.env` file and past the above environment variables
- The database could be either mysql or postgres sequelize will handle the rest just set details of which ever db you wish to use
- run `npm run watch` to create the dist folder with compiled js code from the ts code.
- running `npm run dev` will spin up the server on `http://localhost:4000/graphql`
- sequelize is running on sync with force so it will clear out the database on each change
- seed the database with the dummy data using `npx sequelize-cli db:seed:all`
- on the graphql interactive ui click the gear icon and update the settings for the request credentials form omit to include, `"request.credentials": "include",`

## Querying

### getting all users

```js
{
  users {
    email,
    username,
    scope,
    password
  }
}
```

### login with username and password

The mutation to login returns the jwt token and also sets the token to cookies which is used for getting events

```js
mutation($username: String!, $password: String!) {
  login(username: $username, password: $password)
}
```

The query variables

```js
// admin user
{  
  "username": "neniEmSu",
  "password": "abc123"
}
// none admin user
{  
  "username": "johnDoe",
  "password": "bbc123"
}
```

### Fetching events

if logged in the and the user has a scope of admin the capacity value is shown

if not logged in or logged in as a base user then the capacity is not accessible.

```js
{
  events {
    id,
    title,
    description,
    price
    capacity
  }
}
```
