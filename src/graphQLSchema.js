import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

// examples
// import {
// 	studentsMutations,
// 	studentsQueries,
// 	studentsTypeDef
// } from './students/typeDefs';
//
// import {
// 	coursesMutations,
// 	coursesQueries,
// 	coursesTypeDef
// } from './courses/typeDefs';
//
// import {
// 	gradesMutations,
// 	gradesQueries,
// 	gradesTypeDef
// } from './grades/typeDefs';

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

// examples
// import studentsResolvers from './students/resolvers';
// import coursesResolvers from './courses/resolvers';
// import gradesResolvers from './grades/resolvers';
import usersResolvers from './users/resolvers';
import matchesResolvers from './matches/resolvers';
import teamsResolvers from './teams/resolvers';
import resultsResolvers from './results/resolvers';
import walletsResolvers from './wallets/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		// studentsTypeDef,
		// coursesTypeDef,
		// gradesTypeDef,
		usersTypeDef,
		matchesTypeDef,
		teamsTypeDef,
		resultsTypeDef,
		walletsTypeDef,
	],
	[
		// studentsQueries,
		// coursesQueries,
		// gradesQueries,
		usersQueries,
		matchesQueries,
		teamsQueries,
		resultsQueries,
		walletsQueries,
	],

	[
		// studentsMutations,
		// coursesMutations,
		// gradesMutations,
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
		// studentsResolvers,
		// coursesResolvers,
		// gradesResolvers,
		usersResolvers,
		matchesResolvers,
		teamsResolvers,
		resultsResolvers,
		walletsResolvers,
	)
});
