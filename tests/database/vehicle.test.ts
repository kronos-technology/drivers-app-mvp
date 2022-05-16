// requireActual ensures you get the real file
// instead of an automock
// we use import type and <typeof ...> to still get types
import * as vehicleLib from '../../src/database/vehicle';

test('Create vehicle', async () => {
  const data: Array<vehicleLib.Vehicle> = [
    {
      plate: 'ZIY246',
      status: 'idle',
      number: '048',
      companyId: 'SABANA',
      currentDriverId: '1070959307'
    },
    {
      plate: 'BAM577',
      status: 'covering#fca-bog-cll13-pte-arnd#33%',
      number: '048',
      companyId: 'SABANA',
      currentDriverId: '1070947951'
    },
    {
      plate: 'ABC123',
      status: 'covering#fca-bog-cll13-pte-arnd#55%',
      number: '013',
      companyId: 'AYACUCHO',
      currentDriverId: '19134629'
    }
  ];
  for (const item of data) {
    const response = await vehicleLib.create(item);
    console.log(response);
    expect(response).toBeDefined();
  }
  await new Promise((r) => setTimeout(r, 2000));
});

test('List all vehicles', async () => {
  const response = await vehicleLib.list();
  console.log(response);
  expect(response).toBeInstanceOf(Array);
});

test('List vehicles by company', async () => {
  const id = 'AYACUCHO';
  const response = await vehicleLib.listByCompany(id);
  console.log(response);
  expect(response).toBeDefined();
});

test('Get vehicle by plate', async () => {
  const testId = 'ZIY246';
  const response = await vehicleLib.get(testId);
  expect(response).toBeDefined();
});

test('Update vehicle status', async () => {
  const plate = 'ZIY246';
  const newStatus = 'cover#bgt-vllta#22%';
  const updateData = { plate: plate, status: newStatus };
  const response = await vehicleLib.update(updateData);
  console.log(response);
  expect(response).toBeDefined();
});

test('Delete vehicle', async () => {
  const id = 'ZIY246';
  const vehicle = await vehicleLib.get(id);
  const removed = await vehicleLib.remove(id);
  console.log('Vehicle removed: ', removed);
  expect(removed).toEqual(vehicle);
});
// required with this small example
// to make the isolatedModules config happy
export {};
