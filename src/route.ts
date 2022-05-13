import table from './util';

export type Route = {
  routeId: String;
  origin: String;
  destination: String;
  geojson: String;
  checkpoints: Array<String>;
};
export type RouteUpdate = {
  routeId: String;
  origin?: String;
  destination?: String;
  geojson?: String;
  checkpoints?: Array<String>;
};

const RouteModel = table.getModel('Route');

async function create(driverInfo: Route) {
  console.log('Creating new driver in database');
  try {
    const newRoute = await RouteModel.create(driverInfo, { exists: false });
    return newRoute;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
}

async function get(id: String) {
  console.log('Retrieving driver with id: ', id);
  try {
    const driverInfo = await RouteModel.get({ driverId: id });
    console.log(driverInfo);
    return driverInfo;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function list() {
  console.log('Listing drivers in database');
  try {
    const driversList = await RouteModel.find({}, { index: 'gs1' });
    return driversList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function listByCompany(id: String) {
  console.log('Listing drivers for company ', id);
  try {
    const driversList = await RouteModel.find(
      { companyId: id },
      { index: 'gs1' }
    );
    return driversList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function update(data: RouteUpdate) {
  console.log('Updating driver ', data.routeId);
  try {
    const driver = await RouteModel.update(data);
    return driver;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function remove(id: String) {
  console.log('Deleting driver ', id);
  try {
    const removed = await RouteModel.remove({ driverId: id });
    return removed;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}
export { list, listByCompany, get, create, update, remove };
