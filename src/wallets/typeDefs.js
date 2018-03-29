export const walletsTypeDef = `
type Wallet {
    id: Int!
    balance: Int!
}

input WalletInput {
    balance: Int!
}
`;

export const walletsQueries = `
    walletById(id: Int!): Wallet!
`;

export const walletsMutations = `
    createWallet(wallet: WalletInput!): Wallet!
    updateWallet(id: Int!, wallet: WalletInput!): Wallet!
`;
