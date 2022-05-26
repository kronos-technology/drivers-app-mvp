// requireActual ensures you get the real file
// instead of an automock
// we use import type and <typeof ...> to still get types
import { Driver } from '../adapter';
import { EntityModel, DriverType, Response } from '../base';

const driverTestData: Array<DriverType> = [
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

describe('driver tests', () => {
  let driverManager: Driver;

  beforeAll(async () => {
    driverManager = new Driver();
  });

  test('create test drivers', async () => {
    let createdDrivers: Array<EntityModel | Response> = [];
    for (const driverInfo of driverTestData) {
      const created = await driverManager.create(driverInfo);
      createdDrivers.push(created);
      console.log(`driver created ${JSON.stringify(created, null, 2)}`);
      expect(created).toBeDefined();
    }
    expect(createdDrivers).toHaveLength(driverTestData.length);
    await new Promise((r) => setTimeout(r, 2000));
  });

  test('list all drivers', async () => {
    const list = await driverManager.list();
    console.log(`List of all drivers: ${JSON.stringify(list, null, 2)}`);
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(driverTestData.length);
  });

  test('list drivers by company', async () => {
    const companyId = 'SABANA';
    const list = await driverManager.listByCompany(companyId);
    console.log(
      `List of all drivers with origin: ${companyId}. ${JSON.stringify(
        list,
        null,
        2
      )}`
    );
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(2);
  });

  test('get driver', async () => {
    const driverId: string = driverTestData[0].driverId;
    const driver: EntityModel | undefined = await driverManager.get(driverId);
    console.log(`driver info ${JSON.stringify(driver, null, 2)}`);
    expect(driver).toBeDefined();
  });

  test('update driver phone', async () => {
    const driverId: string = driverTestData[0].driverId;
    const updateData = {
      driverId: driverId,
      phone: '+6018438920'
    };
    const response = await driverManager.update(updateData);
    console.log(`driver updated ${JSON.stringify(response, null, 2)}`);
    expect(response).toBeDefined();
  });

  test('delete driver', async () => {
    let deletedDrivers: Array<EntityModel | Response | undefined> = [];
    for (const driverInfo of driverTestData) {
      const driverId: string = driverInfo.driverId;
      const deleted = await driverManager.delete(driverId);
      deletedDrivers.push(deleted);
      console.log(`driver deleted ${JSON.stringify(deleted, null, 2)}`);
      expect(deleted).toBeDefined();
    }
    expect(deletedDrivers).toHaveLength(driverTestData.length);
    await new Promise((r) => setTimeout(r, 2000));
  });
  // required with this small example
});
