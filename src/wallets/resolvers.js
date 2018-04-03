import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
  Query: {
    walletById: (_, { id }) => generalRequest(`${URL}/${id}`, 'GET'),
  },
  Mutation: {
    updateWallet: (_, { id, wallet }) => generalRequest(`${URL}/${id}`, 'PUT', wallet),
  },
};

export default resolvers;
