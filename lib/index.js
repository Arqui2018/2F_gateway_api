'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');
var soap = _interopDefault(require('soap'));

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */

async function generalRequest(url, method, body, fullResponse) {
	// authorization
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {string} method
 */

async function generalRequestSOAP(url, method, body) {

	url = encodeURI(url);
	const args = {};
	Object.keys(body).forEach(key => {
		args[key] = body[key];
	});

	try {
		const client = await soap.createClientAsync(url);
		let result = await client[`${method}Async`](args);
		// clean data
		result = result[0];
		Object.keys(result).forEach(key => {
			result[key] = result[key]['$value'];
		});

		return result;
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const usersTypeDef = `
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

const usersQueries = `
  sessionByToken(token: String!): User!
`;

const usersMutations = `
  createSession(user: UserIntput!): AuthPayload!
  destroySession(token: String!): User!
`;

const matchesTypeDef = `
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

const matchesQueries = `
    allMatches: [Match]!
    matchById(id: Int!): Match!
`;

const teamsTypeDef = `
type Team {
    id: Int!
    name: String!
}
`;

const teamsQueries = `
    allTeams: [Team]!
    teamById(id: Int!): Team!
`;

const resultsTypeDef = `
type Result {
  id: Int
  user_id: Int!
  amount: Int!
  date: String!
  g_local: Int!
  g_visit: Int!
  winner: Boolean!
  match_id: Int!
  wallet_id: Int!
}

input ResultInput {
  user_id: Int!
  amount: Int!
  date: String
  g_local: Int!
  g_visit: Int!
  winner: Boolean
  match_id: Int!
  wallet_id: Int!
}
`;

const resultsQueries = `
    allResults: [Result]!
    resultById(id: Int!): Result!
    resultByUser(id: Int!): [Result]!
    resultByMatch(id: Int!): [Result]!
`;

const resultsMutations = `
    createResult(result: ResultInput!): Result!
    deleteResult(id: Int!): Result!
    updateResult(id: Int!, result: ResultInput!): Result!
`;

const walletsTypeDef = `
type Wallet {
    id: Int!
    balance: Int!
}

input WalletInput {
    balance: Int!
}
`;

const walletsQueries = `
    walletById(id: Int!): Wallet!
`;

const walletsMutations = `
    createWallet(wallet: WalletInput!): Wallet!
    updateWallet(id: Int!, wallet: WalletInput!): Wallet!
`;

const url = process.env.USERS_URL || 'user_ms';
const port = process.env.USERS_PORT || '4001';
const entryPoint = process.env.USERS_ENTRY || 'sessions';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
  Query: {
    sessionByToken: (_, token) => generalRequestSOAP(`${URL}`, 'showSession', token),
  },
  Mutation: {
    createSession: (_, { user }) => generalRequestSOAP(`${URL}`, 'createSession', user),
    destroySession: (_, token) => generalRequestSOAP(`${URL}`, 'destroySession', token),
  },
};

const url$1 = process.env.MATCHES_URL || 'matches_ms';
const port$1 = process.env.MATCHES_PORT || '4003';
const entryPoint$1 = process.env.MATCHES_ENTRY || 'matches';

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$1 = {
  Query: {
    allMatches: (_) => getRequest(URL$1, ''),
    matchById: (_, { id }) => generalRequest(`${URL$1}/${id}`, 'GET'),
  }
};

const url$2 = process.env.TEAMS_URL || 'matches_ms';
const port$2 = process.env.TEAMS_PORT || '4003';
const entryPoint$2 = process.env.TEAMS_ENTRY || 'teams';

const URL$2 = `http://${url$2}:${port$2}/${entryPoint$2}`;

const resolvers$2 = {
	Query: {
		allTeams: (_) =>
			getRequest(URL$2, ''),
		teamById: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'GET'),
	},
};

const url$3 = process.env.RESULTS_URL || 'result-ms';
const port$3 = process.env.RESULTS_PORT || '4005';
const entryPoint$3 = process.env.RESULTS_ENTRY || 'results';

const URL$3 = `http://${url$3}:${port$3}/${entryPoint$3}`;

const resolvers$3 = {
  Query: {
    allResults: (_) => getRequest(URL$3, ''),
    resultById: (_, { id }) => generalRequest(`${URL$3}/${id}`, 'GET'),
    resultByUser: (_, { id }) => generalRequest(`${URL$3}/users/${id}`, 'GET'),
    resultByMatch: (_, { id }) => generalRequest(`${URL$3}/matches/${id}`, 'GET'),
  },
  Mutation: {
    createResult: (_, { result }) => generalRequest(`${URL$3}/`, 'POST', result),
    updateResult: (_, { id, result }) => generalRequest(`${URL$3}/${id}/`, 'PUT', result),
    deleteResult: (_, { id }) => generalRequest(`${URL$3}/${id}/`, 'DELETE'),
  },
};

const url$4 = process.env.WALLETS_URL || 'wallets-ms';
const port$4 = process.env.WALLETS_PORT || '4004';
const entryPoint$4 = process.env.WALLETS_ENTRY || 'wallets';

const URL$4 = `http://${url$4}:${port$4}/${entryPoint$4}`;

const resolvers$4 = {
  Query: {
    walletById: (_, { id }) => generalRequest(`${URL$4}/${id}`, 'GET'),
  },
  Mutation: {
    createWallet: (_, { wallet }) => generalRequest(`${URL$4}/`, 'POST', wallet),
    updateWallet: (_, { id, wallet }) => generalRequest(`${URL$4}/${id}`, 'PUT', wallet),
  },
};

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
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2,
		resolvers$3,
		resolvers$4,
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 3000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
