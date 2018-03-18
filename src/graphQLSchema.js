import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	studentsMutations,
	studentsQueries,
	studentsTypeDef
} from './students/typeDefs';

import {
	coursesMutations,
	coursesQueries,
	coursesTypeDef
} from './courses/typeDefs';

import {
	gradesMutations,
	gradesQueries,
	gradesTypeDef
} from './grades/typeDefs';

import {
	usersMutations,
	usersQueries,
	usersTypeDef
} from './users/typeDefs';

import studentsResolvers from './students/resolvers';
import coursesResolvers from './courses/resolvers';
import gradesResolvers from './grades/resolvers';
import usersResolvers from './users/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		studentsTypeDef,
		coursesTypeDef,
		gradesTypeDef,
		usersTypeDef
	],
	[
		studentsQueries,
		coursesQueries,
		gradesQueries,
		usersQueries,
	],
	[
		studentsMutations,
		coursesMutations,
		gradesMutations,
		usersMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		studentsResolvers,
		coursesResolvers,
		gradesResolvers,
		usersResolvers,
	)
});
