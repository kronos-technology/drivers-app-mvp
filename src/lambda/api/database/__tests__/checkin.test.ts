import { Checkin } from '../adapter';
import { EntityModel, CheckinType, Response } from '../base';

const checkinTestData: Array<CheckinType> = [
  {
    checkpointId: 'FACA-ABOGADOS',
    routeId: 'FACATA-BOGOTA-13',
    timestamp: '2022-05-18T12:00:00.123-0500',
    plate: 'ZIY246',
    driverId: '1070959307',
    vehicleNumber: '077',
    companyId: 'EXPRESO-SABANA'
  },
  {
    checkpointId: 'FACA-ABOGADOS',
    routeId: 'FACATA-BOGOTA-13',
    timestamp: '2022-05-18T12:06:28.313-0500',
    plate: 'BAM577',
    driverId: '1070947951',
    vehicleNumber: '012',
    companyId: 'RAPIDO-SANTA'
  },
  {
    checkpointId: 'FACA-ABOGADOS',
    routeId: 'FACATA-BOGOTA-13',
    timestamp: '2022-05-18T12:15:00-0500',
    plate: 'RPG333',
    driverId: '19134629',
    vehicleNumber: '98',
    companyId: 'FLOTA-AMERICANA'
  },
  {
    checkpointId: 'FACA-ABOGADOS',
    routeId: 'FACATA-BOGOTA-80',
    timestamp: '2022-06-19T10:10:35-0500',
    plate: 'ABC132',
    driverId: '107094791',
    vehicleNumber: '127',
    companyId: 'FLOTA-AGUILA'
  },
  {
    checkpointId: 'FACA-ABOGADOS',
    routeId: 'FACATA-BOGOTA-80',
    timestamp: '2022-05-19T10:23:35-0500',
    plate: 'ZIY246',
    driverId: '11444731',
    vehicleNumber: '077',
    companyId: 'COOTRANSA'
  },
  {
    checkpointId: 'FACA-CARTAGENITA',
    routeId: 'FACATA-BOGOTA-13',
    timestamp: '2022-05-18T12:15:00-0500',
    plate: 'ZIY246',
    driverId: '1070959307',
    vehicleNumber: '077',
    companyId: 'EXPRESO-SABANA'
  },
  {
    checkpointId: 'FACA-CARTAGENITA',
    routeId: 'FACATA-BOGOTA-13',
    timestamp: '2022-05-18T12:23:02-0500',
    plate: 'BAM577',
    driverId: '1070947951',
    vehicleNumber: '077',
    companyId: 'EXPRESO-SABANA'
  },
  {
    checkpointId: 'BJCA-CORSO',
    routeId: 'FACATA-BOGOTA-13',
    timestamp: '2022-05-18T12:19:00-0500',
    plate: 'ZIY246',
    driverId: '1070959307',
    vehicleNumber: '077',
    companyId: 'EXPRESO-SABANA'
  },
  {
    checkpointId: 'BJCA-CORSO',
    routeId: 'FACATA-BOGOTA-13',
    timestamp: '2022-05-18T12:26:12-0500',
    plate: 'BAM577',
    driverId: '1070947951',
    vehicleNumber: '077',
    companyId: 'EXPRESO-SABANA'
  },
  {
    checkpointId: 'MADR-PROSPERIDAD',
    routeId: 'FACATA-BOGOTA-13',
    timestamp: '2022-05-18T12:25:33-0500',
    plate: 'ZIY246',
    driverId: '1070959307',
    vehicleNumber: '077',
    companyId: 'EXPRESO-SABANA'
  },
  {
    checkpointId: 'MADR-PROSPERIDAD',
    routeId: 'FACATA-BOGOTA-13',
    timestamp: '2022-05-18T12:32:28-0500',
    plate: 'BAM577',
    driverId: '1070947951',
    vehicleNumber: '077',
    companyId: 'EXPRESO-SABANA'
  }
];

describe('checkin tests', () => {
  let checkinManager: Checkin;

  beforeAll(async () => {
    checkinManager = new Checkin();
  });
  test.only('create test checkins', async () => {
    let createdCheckins: Array<EntityModel | Response> = [];
    for (const checkinInfo of checkinTestData) {
      const created = await checkinManager.create(checkinInfo);
      createdCheckins.push(created);
      console.log(`Checkin created ${JSON.stringify(created, null, 2)}`);
      expect(created).toBeDefined();
    }
    expect(createdCheckins).toHaveLength(checkinTestData.length);
    await new Promise((r) => setTimeout(r, 2000));
  });

  test('list all checkins', async () => {
    const list = await checkinManager.list();
    console.log(`List of all checkins: ${JSON.stringify(list, null, 2)}`);
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(checkinTestData.length);
  });

  test('get checkin history', async () => {
    const checkpointId = checkinTestData[0].checkpointId;
    const list = await checkinManager.getCheckinHistory(checkpointId);
    const _list = JSON.stringify(list, null, 2);
    console.log(`Checkin history for checkpoint ${checkpointId}. ${_list} `);
    expect(list).toBeInstanceOf(Array);
  });

  test('get checkin history filtered by route', async () => {
    const checkpointId = checkinTestData[0].checkpointId;
    const routeId = 'FACATA-BOGOTA-80';
    const qty = 2;
    const list = await checkinManager.getCheckinHistoryByRoute(
      checkpointId,
      routeId,
      qty
    );
    const _list = JSON.stringify(list, null, 2);
    console.log(
      `${qty} latest checkin at checkpoint ${checkpointId} for route ${routeId}: ${_list}`
    );

    expect(list).toBeInstanceOf(Array);
  });

  test('delete checkin history', async () => {
    const deleted = await checkinManager.deleteCheckinHistory();
    const _deleted = JSON.stringify(deleted, null, 2);
    console.log(`Removed checkpoints: ${_deleted}`);
    expect(_deleted).toBeDefined();
  });
});
