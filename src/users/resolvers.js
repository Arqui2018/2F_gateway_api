import { generalRequestSOAP } from '../utilities';
import { url, port, entryPoint } from './server';

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

export default resolvers;
