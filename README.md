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

# Result

```graphql
query {
  allResults {
    user_id
    monto
    fecha
    gol_1
    gol_2
    winner
    partido_id
    wallet_id
  }
}

query {
  resultById(id: 2) {
    user_id
    monto
    fecha
    gol_1
    gol_2
    winner
    partido_id
    wallet_id
  }
}

mutation {
  createResult(result: {
  	user_id: 18
    monto: 5600
    fecha: "2018-03-30T05:07:09.013046Z"
    gol_1: 0
    gol_2: 4
    winner: false
    partido_id: 35
    wallet_id: 6070
  }) {
    user_id
    monto
    fecha
    gol_1
    gol_2
    winner
    partido_id
    wallet_id
  }
}

mutation {
  updateResult(id: 2, result: {
  	user_id: 18
    monto: 6666
    fecha: "2018-03-30T05:07:09.013046Z"
    gol_1: 0
    gol_2: 4
    winner: false
    partido_id: 35
    wallet_id: 6070
  }) {
    user_id
    monto
    fecha
    gol_1
    gol_2
    winner
    partido_id
    wallet_id
  }
}

mutation {
  deleteResult(id: 8) {
    id
    user_id
    monto
    fecha
    gol_1
    gol_2
    winner
    partido_id
    wallet_id
  }
}
```

# Wallet

```graphql
query {
  walletById(id: 2) {
    id
    balance
  }
}

mutation {
  updateWallet(id: 2, wallet: {
    balance: 12
  }) {
    id
    balance
  }
} 
```

# PORTS

api_gateway_ms 4000

user_ms 4001
user_db 3009

wallet_ms 4040
wallet_db 3309

match_ms 4003
match_db 3011

winner_ms 4004
winner_db 3012

result_ms 4005
result_db 3013
