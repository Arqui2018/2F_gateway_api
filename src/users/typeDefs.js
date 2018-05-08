export const usersTypeDef = `
type User {
  id: Int!
  name: String!
  nickname: String
  email: String!
  wallet_id: Int!
  autentication: Boolean!
}

type AuthPayload {
  email: String!
  authentication_token: String!
  autentication: Boolean!
}

input UserIntput {
  email: String!
  password: String!
}
`;

export const usersQueries = `
  sessionByToken(token: String!): User!
`;

export const usersMutations = `
  createSession(user: UserIntput!): AuthPayload!
  destroySession(token: String!): User!
`;
