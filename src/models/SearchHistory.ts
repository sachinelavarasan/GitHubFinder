import Realm from 'realm';

export class SearchHistory extends Realm.Object<SearchHistory> {
  shId!: Realm.BSON.UUID;
  shWord!: string;
  createdAt!: Date;

  static generate(searchword: string) {
    return {
      shId: new Realm.BSON.UUID(),
      shWord: searchword,
      createdAt: new Date()
    };
  }

  static schema = {
    name: 'SearchHistory',
    properties: {
      shId: 'uuid',
      shWord: 'string',
      createdAt: 'date'
    },
    primaryKey: 'shId'
  };
}
