import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
  Query: {
    allResults: (_) => getRequest(URL, ''),
    resultById: (_, { id }) => generalRequest(`${URL}/${id}`, 'GET'),
  },
  Mutation: {
    createResult: (_, { result }) => generalRequest(`${URL}/`, 'POST', result),
    updateResult: (_, { id, result }) => generalRequest(`${URL}/${id}/`, 'PUT', result),
    deleteResult: (_, { id }) => generalRequest(`${URL}/${id}/`, 'DELETE'),
  },
};

export default resolvers;
