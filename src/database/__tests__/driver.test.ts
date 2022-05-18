// requireActual ensures you get the real file
// instead of an automock
// we use import type and <typeof ...> to still get types
import * as driverLib from '../driver';

test('Create driver', async () => {
  const data: Array<driverLib.Driver> = [
    {
      driverId: '1070959307',
      name: 'Walla',
      lastName: 'Gonzalez',
      companyId: 'SABANA',
      birthdate: '1990-12-06',
      phone: '+573103308156'
    },
    {
      driverId: '1070947951',
      name: 'Fredy',
      lastName: 'Gonzalez',
      companyId: 'AYACUCHO',
      birthdate: '1987-09-08',
      phone: '+573058134980'
    },
    {
      driverId: '19134629',
      name: 'Alfonso',
      lastName: 'Gonzalez',
      companyId: 'SABANA',
      birthdate: '1991-01-28',
      phone: '+573194106391'
    }
  ];
  for (const item of data) {
    const response = await driverLib.create(item);
    expect(response).toBeDefined();
  }
  await new Promise((r) => setTimeout(r, 2000));
});

test('List all drivers', async () => {
  const response = await driverLib.list();
  console.log(response);
  expect(response).toBeInstanceOf(Array);
});

test('List drivers by company', async () => {
  const id = 'SABANA';
  const response = await driverLib.listByCompany(id);
  console.log(response);
  expect(response).toBeDefined();
});

test('Get driver by Id', async () => {
  const testId = '1070959307';
  const response = await driverLib.get(testId);
  expect(response).toBeDefined();
});

test('Update driver name', async () => {
  const id = '1070959307';
  const newName = 'Anderson';
  const newLastName = 'Gonzalez Garcia';
  const updateData = { driverId: id, name: newName, lastName: newLastName };
  const response = await driverLib.update(updateData);
  console.log(response);
  expect(response).toBeDefined();
});

test('Delete driver', async () => {
  const id = '19134629 ';
  const driver = await driverLib.get(id);
  const removed = await driverLib.remove(id);
  console.log('Driver removed: ', removed);
  expect(removed).toEqual(driver);
});
// required with this small example
// to make the isolatedModules config happy
export {};
