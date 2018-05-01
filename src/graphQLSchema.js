import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	usersMutations,
	usersQueries,
	usersTypeDef
} from './users/typeDefs';

import {
	matchesQueries,
	matchesTypeDef
} from './matches/typeDefs';

import {
	teamsQueries,
	teamsTypeDef
} from './teams/typeDefs';

import {
	resultsMutations,
	resultsQueries,
	resultsTypeDef
} from './results/typeDefs';

import {
	walletsMutations,
	walletsQueries,
	walletsTypeDef
}from './wallets/typeDefs';

import usersResolvers from './users/resolvers';
import matchesResolvers from './matches/resolvers';
import teamsResolvers from './teams/resolvers';
import resultsResolvers from './results/resolvers';
import walletsResolvers from './wallets/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		usersTypeDef,
		matchesTypeDef,
		teamsTypeDef,
		resultsTypeDef,
		walletsTypeDef,
	],
	[
		usersQueries,
		matchesQueries,
		teamsQueries,
		resultsQueries,
		walletsQueries,
	],

	[
		usersMutations,
		resultsMutations,
		walletsMutations,
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		usersResolvers,
		matchesResolvers,
		teamsResolvers,
		resultsResolvers,
		walletsResolvers,
	)
});
