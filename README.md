# sa_academy_api

API Gateway

* JavaScript
* Node.js
* GraphQL

# Microservices GraphQL

## User_ms

* request
```graphql
mutation {
  createSession(user: {
    email: "example@example.com"
    password: "123456"
  }) {
    authentication_token
  }
}

query {
  sessionByToken(token: "mawkjXZpxTayRsB6E6XT") {
    name
    email
    authentication_token
    created_at
    updated_at
  }
}

mutation {
  removeSession(token: "mawkjXZpxTayRsB6E6XT") {
    id
  }
}
```

## Matches

* Matches are between 1 and 49
* Teams are between 1 and 32

```graphql
query {
  allMatches {
    id
    team_local_id
    team_visitor_id
    goals_local
    goals_visitor
    date
    createdAt
    updatedAt
  }
}

query {
  matchById(id: 49) {
    id
    team_local_id
    team_visitor_id
    goals_local
    goals_visitor
    date
    createdAt
    updatedAt
  }
}

query {
  allTeams {
    id
    name
  }
}

query {
  teamById(id: 32){
    id
    name
  }
}
```
