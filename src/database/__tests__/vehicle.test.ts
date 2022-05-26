// requireActual ensures you get the real file
// instead of an automock
// we use import type and <typeof ...> to still get types
import { Vehicle } from '../adapter';
import { EntityModel, VehicleType, Response } from '../base';

const vehicleTestData: Array<VehicleType> = [
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

describe('vehicle tests', () => {
  let vehicleManager: Vehicle;

  beforeAll(async () => {
    vehicleManager = new Vehicle();
  });

  test('create test vehicles', async () => {
    let createdVehicles: Array<EntityModel | Response> = [];
    for (const vehicleInfo of vehicleTestData) {
      const created = await vehicleManager.create(vehicleInfo);
      createdVehicles.push(created);
      console.log(`Vehicle created ${JSON.stringify(created, null, 2)}`);
      expect(created).toMatchObject(vehicleInfo);
    }
    expect(createdVehicles).toHaveLength(vehicleTestData.length);
    await new Promise((r) => setTimeout(r, 2000));
  });

  test('list all vehicles', async () => {
    const list = await vehicleManager.list();
    console.log(`List of all vehicles: ${JSON.stringify(list, null, 2)}`);
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(vehicleTestData.length);
  });

  test('list vehicles by company', async () => {
    const id = 'SABANA';
    const list = await vehicleManager.listByCompany(id);
    console.log(
      `List of all vehicles for company ${id}: ${JSON.stringify(list, null, 2)}`
    );
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(2);
  });

  test('get vehicle', async () => {
    const plate: string = vehicleTestData[0].plate;
    const vehicle: EntityModel | undefined = await vehicleManager.get(plate);
    console.log(`Vehicle info ${JSON.stringify(vehicle, null, 2)}`);
    expect(vehicle).toBeDefined();
  });

  test('update vehicle status', async () => {
    const plate: string = vehicleTestData[0].plate;
    const updateData = { plate: plate, status: 'COVERING#FACA-BOGOTA-13' };
    const response = await vehicleManager.update(updateData);
    console.log(`Vehicle updated ${JSON.stringify(response, null, 2)}`);
    expect(response).toBeDefined();
  });

  test('delete vehicle', async () => {
    let deletedVehicles: Array<EntityModel | Response | undefined> = [];
    for (const vehicleInfo of vehicleTestData) {
      const plate: string = vehicleInfo.plate;
      const deleted = await vehicleManager.delete(plate);
      deletedVehicles.push(deleted);
      console.log(`Vehicle deleted ${JSON.stringify(deleted, null, 2)}`);
      expect(deleted).toBeDefined();
    }
    expect(deletedVehicles).toHaveLength(vehicleTestData.length);
    await new Promise((r) => setTimeout(r, 2000));
  });
  // required with this small example
});
