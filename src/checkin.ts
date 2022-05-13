import table from './util';

export type Checkin = {
  checkpointId: String;
  routeId: String;
  timestamp: String;
  plate: String;
  driverId: String;
};
export type CheckinUpdate = {
  checkpointId: String;
  routeId?: String;
  timestamp: String;
  plate?: String;
  driverId?: String;
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

async function list() {
  console.log('Listing all checkin items in DB');
  try {
    const checkinList = await CheckinModel.find({}, { index: 'gs1' });
    return checkinList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function listByRoute(id: String) {
  console.log('Listing checkins by route: ', id);
  try {
    const checkinList = await CheckinModel.find(
      { routeId: id },
      { index: 'gs1' }
    );
    return checkinList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function listByVehicle(plate: String) {
  console.log('Listing checkins by vehicle: ', plate);
  try {
    const checkinList = await CheckinModel.find(
      { plate: plate },
      { index: 'gs1' }
    );
    return checkinList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function remove(id: String) {
  console.log('Deleting checkin ', id);
  try {
    const removed = await CheckinModel.remove({ checkinId: id });
    return removed;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}
export { list, listByRoute, listByVehicle, create, remove };
