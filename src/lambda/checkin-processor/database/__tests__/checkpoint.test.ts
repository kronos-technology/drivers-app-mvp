import { Checkpoint } from '../adapter';
import { EntityModel, CheckpointType, Response } from '../base';

const checkpointTestData: Array<CheckpointType> = [
  {
    checkpointId: 'FACA-ABOGADOS',
    city: 'FACATATIVA',
    latitude: '4.8081859',
    longitude: '-74.3545',
    geohash: 'd2g5k529swff',
    description: 'Paradero calle de los abogados'
  },
  {
    checkpointId: 'FACA-CARTAGENITA',
    city: 'FACATATIVA',
    latitude: '4.7877793',
    longitude: '74.3339603',
    geohash: 'd2g5k529swff',
    description: 'Puente Peatonal Cartagenita'
  },
  {
    checkpointId: 'BJCA-CORSO',
    city: 'BOJACA',
    latitude: '4.7731948',
    longitude: '-74.3180107',
    geohash: 'd2g5hugmbu48',
    description: 'Puente Peatonal El Corso'
  },
  {
    checkpointId: 'MADR-PROSPERIDAD',
    city: 'MADRID',
    latitude: '4.7392487',
    longitude: '-74.2773529',
    geohash: 'd2g4vybbh5zr',
    description: 'Glorieta La Prosperidad'
  },
  {
    checkpointId: 'MADR-FINCA',
    city: 'MADRID',
    latitude: '4.7330623',
    longitude: '-74.2431775',
    geohash: 'd2g4yt9u0df2',
    description: 'Variante de Madrid. La finca'
  },
  {
    checkpointId: 'MOSQ-SENA',
    city: 'MOSQUERA',
    latitude: '4.6972294',
    longitude: '-74.2186001',
    geohash: 'd2g4xp5em708',
    description: 'SENA Mosquera'
  },
  {
    checkpointId: 'BGTA-RIOBOGOTA',
    city: 'BOGOTA',
    latitude: '4.6958893',
    longitude: '-74.1732486',
    geohash: 'd2g68nuew11n',
    description: 'Calle 13. Puente Rio Bogota'
  },
  {
    checkpointId: 'BGTA-CALI13',
    city: 'BOGOTA',
    latitude: '4.6596334',
    longitude: '-74.138146',
    geohash: 'd2g68bq0rfxe',
    description: 'Calle 13 y Avenida Cali'
  }
];
jest.setTimeout(100000);
describe('checkpoint tests', () => {
  let checkpointManager: Checkpoint;

  beforeAll(async () => {
    checkpointManager = new Checkpoint();
  });

  test('create test checkpoints', async () => {
    let createdCheckpoints: Array<EntityModel | Response> = [];
    for (const checkpointInfo of checkpointTestData) {
      const created = await checkpointManager.create(checkpointInfo);
      createdCheckpoints.push(created);
      console.log(`checkpoint created ${JSON.stringify(created, null, 2)}`);
      expect(created).toBeDefined();
    }
    expect(createdCheckpoints).toHaveLength(checkpointTestData.length);
    await new Promise((r) => setTimeout(r, 2000));
  });

  test('list all checkpoints', async () => {
    const list = await checkpointManager.list();
    console.log(`List of all checkpoints: ${JSON.stringify(list, null, 2)}`);
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(checkpointTestData.length);
  });

  test('get checkpoint', async () => {
    const checkpointId: string = checkpointTestData[0].checkpointId;
    const checkpoint: EntityModel | undefined = await checkpointManager.get(
      checkpointId
    );
    console.log(`checkpoint info ${JSON.stringify(checkpoint, null, 2)}`);
    expect(checkpoint).toBeDefined();
  });

  test('update checkpoint description', async () => {
    const checkpointId: string = checkpointTestData[0].checkpointId;
    const updateData = {
      checkpointId: checkpointId,
      description: 'This is a completely new description'
    };
    const response = await checkpointManager.update(updateData);
    console.log(`checkpoint updated ${JSON.stringify(response, null, 2)}`);
    expect(response).toBeDefined();
  });

  test('assign route to checkpoint', async () => {
    const checkpointId: string = checkpointTestData[0].checkpointId;
    const routeId: string = 'FACATA-VTEMAD-BOGOTA-13';
    const assignedRoute = await checkpointManager.assignRoute(
      checkpointId,
      routeId
    );
    console.log(`Route ${routeId} assigned to checkpoint ${checkpointId} `);
    expect(assignedRoute).toBeDefined();
  });

  test('get assigned routes to checkpoint', async () => {
    const checkpointId: string = checkpointTestData[0].checkpointId;
    const routeId: string = 'FACATA-VTEMAD-BOGOTA-13';
    const assignedRoutes = await checkpointManager.getAssignedRoutes(
      checkpointId
    );
    const _routes = JSON.stringify(assignedRoutes, null, 2);
    console.log(`Routes assigned to checkpoint: ${routeId}: ${_routes}`);
    expect(assignedRoutes).toBeDefined();
  });

  test('unassign route from checkpoint', async () => {
    const checkpointId: string = checkpointTestData[0].checkpointId;
    const routeId: string = 'FACATA-VTEMAD-BOGOTA-13';
    const unassignedRoute = await checkpointManager.unassignRoute(
      checkpointId,
      routeId
    );
    const route = JSON.stringify(unassignedRoute, null, 2);
    console.log(`Route unassigned from checkpoint: ${routeId}: ${route}`);
  });

  test('delete checkpoint', async () => {
    let deletedCheckpoints: Array<EntityModel | Response | undefined> = [];
    for (const checkpointInfo of checkpointTestData) {
      const checkpointId: string = checkpointInfo.checkpointId;
      const deleted = await checkpointManager.delete(checkpointId);
      deletedCheckpoints.push(deleted);
      console.log(`checkpoint deleted ${JSON.stringify(deleted, null, 2)}`);
      expect(deleted).toBeDefined();
    }
    expect(deletedCheckpoints).toHaveLength(checkpointTestData.length);
    await new Promise((r) => setTimeout(r, 2000));
  });
  // required with this small example
});
