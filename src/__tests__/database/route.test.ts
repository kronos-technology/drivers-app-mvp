import * as routeLib from '../../database/route';

test('Create route', async () => {
  const data: Array<routeLib.Route> = [
    {
      origin: 'FACATATIVA',
      destination: 'BOGOTA',
      intermediates: ['MADRID', 'CALLE13'],
      geojson: 's3://locationtoroute1.geojson'
    },
    {
      origin: 'FACATATIVA',
      destination: 'BOGOTA',
      intermediates: ['VARIANTE', 'CALLE13'],
      geojson: 's3://locationtoroute2.geojson'
    },
    {
      origin: 'FACATATIVA',
      destination: 'BOGOTA',
      intermediates: ['MOSQUERA', 'FUNZA', 'CALLE80'],
      geojson: 's3://locationtoroute2.geojson'
    },
    {
      origin: 'MADRID',
      destination: 'BOGOTA',
      intermediates: ['CALLE13'],
      geojson: 's3://locationtoroute1.geojson'
    },
    {
      origin: 'MADRID',
      destination: 'BOGOTA',
      intermediates: ['MOSQUERA', 'FUNZA', 'CALLE80'],
      geojson: 's3://locationtoroute1.geojson'
    },
    {
      origin: 'FACATATIVA',
      intermediates: ['CORSO'],
      destination: 'BOJACA',
      geojson: 's3://locationtoroute2.geojson'
    },
    {
      origin: 'FACATATIVA',
      destination: 'ZIPAQUIRA',
      intermediates: ['MOSQUERA', 'FUNZA', 'COTA', 'CHIA'],
      geojson: 's3://locationtoroute2.geojson'
    }
  ];
  for (const item of data) {
    const response = await routeLib.create(item);
    expect(response).toBeDefined();
  }
  await new Promise((r) => setTimeout(r, 2000));
});

test('List routes', async () => {
  const response = await routeLib.list();
  console.log(response);
  expect(response).toBeInstanceOf(Array);
});

test('List routes by destination', async () => {
  const destination: String = 'Zipaquira';
  const response = await routeLib.listByDestination(destination);
  console.log(response);
  expect(response).toBeInstanceOf(Array);
});

test('List routes by origin ', async () => {
  const origin: String = 'MADRID';
  const response = await routeLib.listByOrigin(origin);
  console.log(response);
  expect(response).toBeInstanceOf(Array);
});

test('Get route', async () => {
  const id = 'MADRID-BOGOTA-1';
  const response = await routeLib.get(id);
  console.log(response);
  expect(response).toBeDefined();
});

test('Delete route', async () => {
  const id = 'FACATA-BOGOTA-1';
  const route = await routeLib.get(id);
  const removed = await routeLib.remove(id);
  console.log('route removed: ', removed);
  expect(removed).toEqual(route);
});
// required with this small example
// to make the isolatedModules config happy
export {};
