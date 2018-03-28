export const teamsTypeDef = `
type Team {
    id: Int!
    name: String!
}
`;

export const teamsQueries = `
    allTeams: [Team]!
    teamById(id: Int!): Team!
`;
