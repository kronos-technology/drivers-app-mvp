import table from './util';

export type Checkpoint = {
  checkpointId: String;
  latitude: String;
  longitude: String;
  city: String;
  geohash: String;
  description?: String;
};

const CheckpointModel = table.getModel('Checkpoint');
const RouteInCheckpointModel = table.getModel('RouteInCheckpoint');
const CheckinModel = table.getModel('Checkin');

async function create(checkpointInfo: Checkpoint) {
  console.log('Creating new checkpoint in DB');
  try {
    const created = await CheckpointModel.create(checkpointInfo, {
      exists: false
    });
    return created;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
}

async function get(id: String) {
  console.log('Retrieving checkpoint by id: ', id);
  try {
    const checkpoint = await CheckpointModel.get({ checkpointId: id });
    return checkpoint;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function getCheckpointHistory(checkpointId: String, limit: number = 3) {
  console.log(`Retrieving history for checkpoint: ${checkpointId}`);
  try {
    const history = await CheckinModel.find(
      { checkpointId },
      { limit, reverse: true }
    );
    console.log(history);
    return history;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function list() {
  console.log('Listing all checkpoint items in DB');
  try {
    const checkpointList = await CheckpointModel.find({}, { index: 'gs1' });
    return checkpointList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function remove(id: String) {
  console.log('Deleting checkpoint ', id);
  try {
    const removed = await CheckpointModel.remove({ checkpointId: id });
    return removed;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function assignRoute(checkpointId: String, routeId: String) {
  try {
    const assigned = await RouteInCheckpointModel.create({
      checkpointId,
      routeId
    });
    return assigned;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function unassignRoute(checkpointId: String, routeId: String) {
  console.log(`Deleting route ${routeId} from checkpoint ${checkpointId}`);
  try {
    const unassigned = await RouteInCheckpointModel.remove({
      checkpointId: checkpointId,
      routeId: routeId
    });
    return unassigned;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function getAssignedRoutes(checkpointId: String) {
  console.log(`Retrieving routes assigned to checkpoint ${checkpointId}`);
  try {
    const assigned = await RouteInCheckpointModel.find({
      checkpointId: checkpointId
    });
    return assigned;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

export {
  get,
  getCheckpointHistory,
  list,
  create,
  remove,
  assignRoute,
  getAssignedRoutes,
  unassignRoute
};
