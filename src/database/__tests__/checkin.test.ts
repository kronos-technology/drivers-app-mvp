import * as checkinLib from '../checkin';

test('Create checkin', async () => {
  const data: Array<checkinLib.Checkin> = [
    {
      checkpointId: 'FACA-ABOGADOS',
      routeId: 'FACATA-BOGOTA-13',
      timestamp: '2022-05-18T12:00:00',
      plate: 'ZIY246',
      driverId: '1070959307'
    },
    {
      checkpointId: 'FACA-ABOGADOS',
      routeId: 'FACATA-BOGOTA-13',
      timestamp: '2022-05-18T12:06:28',
      plate: 'BAM577',
      driverId: '1070947951'
    },
    {
      checkpointId: 'FACA-CARTAGENITA',
      routeId: 'FACATA-BOGOTA-13',
      timestamp: '2022-05-18T12:15:00',
      plate: 'ZIY246',
      driverId: '1070959307'
    },
    {
      checkpointId: 'FACA-CARTAGENITA',
      routeId: 'FACATA-BOGOTA-13',
      timestamp: '2022-05-18T12:23:02',
      plate: 'BAM577',
      driverId: '1070947951'
    },
    {
      checkpointId: 'BJCA-CORSO',
      routeId: 'FACATA-BOGOTA-13',
      timestamp: '2022-05-18T12:19:00',
      plate: 'ZIY246',
      driverId: '1070959307'
    },
    {
      checkpointId: 'BJCA-CORSO',
      routeId: 'FACATA-BOGOTA-13',
      timestamp: '2022-05-18T12:26:12',
      plate: 'BAM577',
      driverId: '1070947951'
    },
    {
      checkpointId: 'MADR-PROSPERIDAD',
      routeId: 'FACATA-BOGOTA-13',
      timestamp: '2022-05-18T12:25:33',
      plate: 'ZIY246',
      driverId: '1070959307'
    },
    {
      checkpointId: 'MADR-PROSPERIDAD',
      routeId: 'FACATA-BOGOTA-13',
      timestamp: '2022-05-18T12:32:28',
      plate: 'BAM577',
      driverId: '1070947951'
    }
  ];
  for (const item of data) {
    const response = await checkinLib.create(item);
    expect(response).toBeDefined();
  }
  await new Promise((r) => setTimeout(r, 2000));
});

test('List checkin by route', async () => {
  const routeId = 'FACATA-BOGOTA-13';
  const response = await checkinLib.listByRoute(routeId);
  console.log(response);
  expect(response).toBeDefined();
});

test('List checkin by vehicle', async () => {
  const plate: String = 'ZIY246';
  const response = await checkinLib.listByVehicle(plate);
  console.log(response);
  expect(response).toBeDefined();
});

// required with this small example
// to make the isolatedModules config happy
export {};
