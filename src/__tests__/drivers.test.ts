// requireActual ensures you get the real file
// instead of an automock
// we use import type and <typeof ...> to still get types
import { listDrivers, createDriver } from '../driver';

describe('Drivers Module', () => {
  test('List all drivers', async () => {
    const response = await listDrivers();
    expect(response).toContain('statusCode');
  });
  test('Create driver', async () => {
    const data = {
      driver_id: '1070959307',
      name: 'Anderson',
      last_name: 'Gonzalez',
      company: 'SABANA',
      birthdate: '1990-12-06'
    };
    const response = await createDriver(data);
    expect(response).toContain('statusCode');
  });
});

// required with this small example
// to make the isolatedModules config happy
export {};
