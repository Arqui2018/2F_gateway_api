export const usersTypeDef = `
type User {
  name: String!
  nickname: String
  email: String!
  wallet_id: Int!
  authentication_token: String!
  created_at: String!
  updated_at: String!
}

type AuthPayload {
  email: String!
  authentication_token: String!
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
  removeSession(token: String!): User!
`;
