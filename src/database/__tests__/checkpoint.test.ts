import * as checkpointLib from '../checkpoint';

test('Create checkpoint', async () => {
  const data: Array<checkpointLib.Checkpoint> = [
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
  for (const item of data) {
    const response = await checkpointLib.create(item);
    expect(response).toBeDefined();
  }
  await new Promise((r) => setTimeout(r, 2000));
});

test('List checkpoints', async () => {
  const response = await checkpointLib.list();
  console.log(response);
  expect(response).toBeInstanceOf(Array);
});

test('Get checkpoint history', async () => {
  const id: String = 'FACA-ABOGADOS';
  const response = await checkpointLib.getCheckpointHistory(id);
  console.log(response);
  expect(response).toBeInstanceOf(Array);
});

test('Get checkpoint', async () => {
  const id = 'FACA-ABOGADOS';
  const response = await checkpointLib.get(id);
  console.log(response);
  expect(response).toBeDefined();
});

test('Delete checkpoint', async () => {
  const id = 'FACA-ABOGADOS';
  const checkpoint = await checkpointLib.get(id);
  const removed = await checkpointLib.remove(id);
  console.log('checkpoint removed: ', removed);
  expect(removed).toEqual(checkpoint);
});

test('Assign route to checkpoint ', async () => {
  const checkpointId: String = 'FACA-ABOGADOS';
  const routeId: String = 'FACA-BGTA-13';
  const destination: String = 'BOGOTA';
  const response = await checkpointLib.assignRoute(checkpointId, routeId);
  console.log(response);
  expect(response).toBeDefined();
});

test('Unassign route from checkpoint', async () => {
  const checkpointId = 'FACA-ABOGADOS';
  const routeId = 'FACA-BGTA-13';
  const addedRoute = await checkpointLib.unassignRoute(checkpointId, routeId);
  console.log(
    `Route ${routeId} unassigned from company ${checkpointId}. ${JSON.stringify(
      addedRoute
    )}`
  );
  expect(addedRoute).toBeDefined();
});

test('Get assigned routes to checkpoint', async () => {
  const checkpointId = 'FACA-ABOGADOS';
  const assignedRoutes = await checkpointLib.getAssignedRoutes(checkpointId);
  console.log(
    `Routes assigned to checkpoint ${checkpointId}: ${JSON.stringify(
      assignedRoutes
    )}`
  );
  expect(assignedRoutes).toBeDefined();
});
// required with this small example
// to make the isolatedModules config happy
export {};
