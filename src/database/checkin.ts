import table from './util';

export type Checkin = {
  checkpointId: String;
  routeId: String;
  timestamp: String;
  plate: String;
  driverId: String;
};

const CheckinModel = table.getModel('Checkin');

async function create(checkinInfo: Checkin) {
  console.log('Creating new checkin in DB');
  try {
    const newCheckin = await CheckinModel.create(checkinInfo, {
      exists: false
    });
    return newCheckin;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
}

async function listByRoute(routeId: String, limit: number = 10) {
  console.log(`Listing checkins for route ${routeId}`);
  try {
    const checkinList = await CheckinModel.find(
      { routeId },
      { index: 'gs1', limit }
    );
    return checkinList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function listByVehicle(plate: String, limit: number = 10) {
  console.log('Listing checkins by vehicle: ', plate);
  try {
    const checkinList = await CheckinModel.find(
      { plate },
      { index: 'gs2', limit, reverse: true }
    );
    return checkinList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

export { listByRoute, listByVehicle, create };
