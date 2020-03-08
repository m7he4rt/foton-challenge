import User, * as UserLoader from '../modules/user/UserLoader';

import UserType from '../modules/user/UserType';

import { GraphQLContext } from '../types';

import { nodeDefinitions } from './node';

import { fromGlobalId } from 'graphql-relay';

const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
  // A method that maps from a global id to an object
  async (globalId, context: GraphQLContext) => {
    const { id, type } = fromGlobalId(globalId);

    if (type === 'Event') {
      return UserLoader.load(context, id);
    }

    // it should not get here
    return null;
  },
  // A method that maps from an object to a type
  obj => {
    if (obj instanceof Event) {
      return UserType;
    }

    // it should not get here
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
export const NodesField = nodesField;