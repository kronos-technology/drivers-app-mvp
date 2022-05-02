// requireActual ensures you get the real file
// instead of an automock
// we use import type and <typeof ...> to still get types
import { listDrivers } from '../driver';

describe('Drivers Module', () => {
  const response = listDrivers();
  console.log(response);
  test('List all drivers', () => {
    expect(listDrivers()).toContain('statusCode');
  });
});

// required with this small example
// to make the isolatedModules config happy
export {};
