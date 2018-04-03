export const resultsTypeDef = `
type Result {
    id: Int
    user_id: Int!
    monto: Int!
    fecha: String!
    gol_1: Int!
    gol_2: Int!
    winner: Boolean!
    partido_id: Int!
    wallet_id: Int!
}

input ResultInput {
    user_id: Int!
    monto: Int!
    fecha: String!
    gol_1: Int!
    gol_2: Int!
    winner: Boolean!
    partido_id: Int!
    wallet_id: Int!
}
`;

export const resultsQueries = `
    allResults: [Result]!
    resultById(id: Int!): Result!
`;

export const resultsMutations = `
    createResult(result: ResultInput!): Result!
    deleteResult(id: Int!): Result!
    updateResult(id: Int!, result: ResultInput!): Result!
`;
