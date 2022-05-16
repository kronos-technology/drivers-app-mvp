import table from './util';

export type Route = {
  origin: String;
  intermediates?: Array<String>;
  destination: String;
  geojson: String;
};

export type RouteUpdate = {
  id: String;
  intermediates?: Array<String>;
  geojson: String;
};

const RouteModel = table.getModel('Route');
const RouteInCheckpointModel = table.getModel('RouteInCheckpoint');

async function create(routeInfo: Route) {
  console.log('Creating new route in database');
  try {
    const created = await RouteModel.create(routeInfo, { exists: false });
    return created;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
}

async function get(id: String) {
  console.log('Retrieving route with id: ', id);
  try {
    const routeInfo = await RouteModel.get({ routeId: id });
    console.log(routeInfo);
    return routeInfo;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function getCheckpoints(routeId: String) {
  console.log(`Retrieving checkpoints in route: ${routeId}`);
  try {
    const checkpoints = await RouteInCheckpointModel.find(
      { routeId: routeId },
      { index: 'gs1' }
    );
    console.log(checkpoints);
    return checkpoints;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function list() {
  console.log('Listing routes in database');
  try {
    const routesList = await RouteModel.find({}, { index: 'gs1' });
    return routesList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function listByOrigin(origin: String) {
  console.log('Listing routes with origin ', origin);
  try {
    const routesList = await RouteModel.find(
      { origin: origin },
      { index: 'gs1' }
    );
    return routesList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}
async function listByDestination(destination: String) {
  console.log('Listing routes with destination ', destination);
  try {
    const routesList = await RouteModel.find(
      { destination: destination },
      { index: 'gs2' }
    );
    return routesList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}
// TODO: Add unit test for this function
async function update(data: RouteUpdate) {
  console.log(`Updating route ${JSON.stringify(data)}`);
  try {
    const vehicle = await RouteModel.update(data);
    return vehicle;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function remove(id: String) {
  console.log('Deleting route ', id);
  try {
    const removed = await RouteModel.remove({ routeId: id });
    return removed;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}
export {
  list,
  listByOrigin,
  listByDestination,
  get,
  getCheckpoints,
  create,
  update,
  remove
};
