import { Realm, createRealmContext } from '@realm/react';
Realm.flags.THROW_ON_GLOBAL_REALM = true;
import { SearchHistory } from './SearchHistory';

// Create a configuration object
const realmConfig: Realm.Configuration = {
  path: './data.realm',
  inMemory: true,
  schema: [SearchHistory],
  schemaVersion: 7
};

// Create a realm context
export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig);
