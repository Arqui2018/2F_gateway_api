export const matchesTypeDef = `
type Match {
    id: Int!
    team_local_id: Int!
    team_visitor_id: Int!
    goals_local: Int
    goals_visitor: Int
    date: String!
    createdAt: String!
    updatedAt: String!
}
`;

export const matchesQueries = `
    allMatches: [Match]!
    matchById(id: Int!): Match!
`;
