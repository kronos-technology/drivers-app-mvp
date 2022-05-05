// requireActual ensures you get the real file
// instead of an automock
// we use import type and <typeof ...> to still get types
import { listDrivers, createDriver } from '../driver';

describe('Drivers Module', () => {
  test('List all drivers', async () => {
    const response = await listDrivers();
    expect(response).toBeInstanceOf(Array);
  });
  test('Create driver', async () => {
    const data = [
      {
        driverId: '1070959307',
        name: 'Anderson',
        lastName: 'Gonzalez',
        company: 'SABANA',
        birthdate: '1990-12-06'
      },
      {
        driverId: '1070947951',
        name: 'Fredy',
        lastName: 'Gonzalez',
        company: 'AYACUCHO',
        birthdate: '1987-09-08'
      },
      {
        driverId: '19134629 ',
        name: 'Alfonso',
        lastName: 'Gonzalez',
        company: 'SABANA',
        birthdate: '1991-01-28'
      }
    ];
    const response = await createDriver(data[0]);
    expect(response).toBeDefined();
  });
});

// required with this small example
// to make the isolatedModules config happy
export {};
