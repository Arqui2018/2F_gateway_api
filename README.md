# sa_academy_api


# users

* cristian@bet.com.co
* jhon@bet.com.co
* dago@bet.com.co
* camilo@bet.com.co

All users have the password: `123456`


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
  sessionByToken(token: "59MxbaV9ukpuDXx5vCTX") {
    name
    nickname
    email
    wallet_id
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
    amount
    date
    g_local
    g_visit
    winner
    match_id
    wallet_id
  }
}

query {
  resultById(id: 2) {
    user_id
    amount
    date
    g_local
    g_visit
    winner
    match_id
    wallet_id
  }
}

query {
  resultByUser(id: 2) {
    id
    user_id
    amount
    date
    g_local
    g_visit
    winner
    match_id
    wallet_id
  }
}

query {
  resultByMatch(id: 123) {
    id
    user_id
    amount
    date
    g_local
    g_visit
    winner
    match_id
    wallet_id
  }
}

mutation {
  createResult(result: {
  	user_id: 18
    amount: 5600
    date: "2018-03-30T05:07:09.013046Z"
    g_local: 0
    g_visit: 4
    winner: false
    match_id: 35
    wallet_id: 6070
  }) {
    user_id
    amount
    date
    g_local
    g_visit
    winner
    match_id
    wallet_id
  }
}

mutation {
  updateResult(id: 2, result: {
  	user_id: 18
    amount: 6666
    date: "2018-03-30T05:07:09.013046Z"
    g_local: 0
    g_visit: 4
    winner: false
    match_id: 35
    wallet_id: 6070
  }) {
    user_id
    amount
    date
    g_local
    g_visit
    winner
    match_id
    wallet_id
  }
}

mutation {
  deleteResult(id: 8) {
    id
    user_id
    amount
    date
    g_local
    g_visit
    winner
    match_id
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

mutation {
  createWallet(wallet: { balance: 100000 }) {
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
