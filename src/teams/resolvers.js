import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allTeams: (_) =>
			getRequest(URL, ''),
		teamById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
};

export default resolvers;
