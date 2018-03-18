import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
  Query: {
    sessionByToken: (_, { token }) => generalRequest(`${URL}/${token}`, 'GET'),
  },
  Mutation: {
    createSession: (_, { user }) => generalRequest(`${URL}`, 'POST', user),
    removeSession: (_, { token }) => generalRequest(`${URL}/${token}`, 'DELETE'),
  },
};

export default resolvers;
