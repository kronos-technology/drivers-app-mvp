import { Route } from '../entities';
import { EntityModel, RouteType, Response } from '../base';

const routeTestData: Array<RouteType> = [
  {
    routeId: 'FACATA-MADRID-BOGOTA-13',
    origin: 'FACATATIVA',
    destination: 'BOGOTA',
    intermediates: ['CALLE13'],
    geojson: 's3://locationtoroute1.geojson'
  },
  {
    routeId: 'FACATA-VTEMAD-BOGOTA-13',
    origin: 'FACATATIVA',
    destination: 'BOGOTA',
    intermediates: ['MADRID', 'CALLE13'],
    geojson: 's3://locationtoroute2.geojson'
  },
  {
    routeId: 'FACATA-BOGOTA-80',
    origin: 'FACATATIVA',
    destination: 'BOGOTA',
    intermediates: ['VARIANTE', 'MOSQUERA', 'FUNZA', 'CALLE13'],
    geojson: 's3://locationtoroute3.geojson'
  },
  {
    routeId: 'FACATA-BOJACA',
    origin: 'FACATATIVA',
    destination: 'BOJACA',
    intermediates: ['CORSO'],
    geojson: 's3://locationtoroute4.geojson'
  },
  {
    routeId: 'BOJACA-BOGOTA',
    origin: 'BOJACA',
    destination: 'BOGOTA',
    intermediates: ['VTEMAD'],
    geojson: 's3://locationtoroute5.geojson'
  }
];

describe('route tests', () => {
  let routeManager: Route;

  beforeAll(async () => {
    routeManager = new Route();
  });

  test('create test routes', async () => {
    let createdRoutes: Array<EntityModel | Response> = [];
    for (const routeInfo of routeTestData) {
      const created = await routeManager.create(routeInfo);
      createdRoutes.push(created);
      console.log(`route created ${JSON.stringify(created, null, 2)}`);
      expect(created).toMatchObject(routeInfo);
    }
    expect(createdRoutes).toHaveLength(routeTestData.length);
    await new Promise((r) => setTimeout(r, 2000));
  });

  test('list all routes', async () => {
    const list = await routeManager.list();
    console.log(`List of all routes: ${JSON.stringify(list, null, 2)}`);
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(routeTestData.length);
  });

  test('list routes by origin', async () => {
    const origin = 'BOJACA';
    const list = await routeManager.listByOrigin(origin);
    console.log(
      `List of all routes with origin: ${origin.toLowerCase()}. ${JSON.stringify(
        list,
        null,
        2
      )}`
    );
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(1);
  });

  test('get route', async () => {
    const routeId: string = routeTestData[0].routeId;
    const route: EntityModel | undefined = await routeManager.get(routeId);
    console.log(`route info ${JSON.stringify(route, null, 2)}`);
    expect(route).toBeDefined();
  });

  test('update route geojson path', async () => {
    const routeId: string = routeTestData[0].routeId;
    const updateData = {
      routeId: routeId,
      geojson: 's3://newrouteinanotherbucket'
    };
    const response = await routeManager.update(updateData);
    console.log(`route updated ${JSON.stringify(response, null, 2)}`);
    expect(response).toBeDefined();
  });

  test('delete route', async () => {
    let deletedRoutes: Array<EntityModel | Response | undefined> = [];
    for (const routeInfo of routeTestData) {
      const routeId: string = routeInfo.routeId;
      const deleted = await routeManager.delete(routeId);
      deletedRoutes.push(deleted);
      console.log(`route deleted ${JSON.stringify(deleted, null, 2)}`);
      expect(deleted).toBeDefined();
    }
    expect(deletedRoutes).toHaveLength(routeTestData.length);
    await new Promise((r) => setTimeout(r, 2000));
  });
  // required with this small example
});
