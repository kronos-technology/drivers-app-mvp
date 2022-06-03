import { DbAdapter } from '../adapter';

const actions = [
  'driver-list',
  'driver-get',
  'driver-create',
  'driver-update',
  'driver-delete',
  'driver-list-by-company',
  'vehicle-list',
  'vehicle-get',
  'vehicle-update'
];

describe.only('adapter tests', () => {
  test.only('instanciate object', async () => {
    for (const action of actions) {
      const adapter = new DbAdapter(action);
      expect(adapter).toBeDefined();
      expect(adapter.queryName).toEqual(action);
    }
  });
});
