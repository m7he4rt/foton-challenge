import path from 'path';

import dotenvSafe from 'dotenv-safe';
import envVar from 'env-var';

const cwd = process.cwd();

const root = path.join.bind(cwd);

if (!process.env.NOW_REGION) {
  dotenvSafe.config({
    allowEmptyValues: process.env.NODE_ENV !== 'production',
    path: root('.env'),
    sample: root('.env.example'),
  });
}

// Server
export const GRAPHQL_PORT = envVar.get('PORT').asPortNumber();

// APP_KEY
export const APP_KEY = process.env.APP_KEY;

// Export some settings that should always be defined
export const MONGO_URL = envVar
  .get('MONGO_URL')
  .required()
  .asString();

export const PROJECT = {
  // server
  GRAPHQL_SCHEMA_FILE: envVar.get('GRAPHQL_SCHEMA_FILE').asString() || './schemas/graphql/schema.graphql',

  // web, app
  GRAPHQL: envVar.get('GRAPHQL').asString() || 'graphql',
};
