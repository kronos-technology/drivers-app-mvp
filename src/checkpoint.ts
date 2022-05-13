import table from './util';

export type Checkpoint = {
  routeId: String;
  checkpointId: String;
  latitude: String;
  longitude: String;
  geohash: String;
};

const checkpointModel = table.getModel('checkpoint');

async function create(checkpointInfo: Checkpoint) {
  console.log('Creating new checkpoint in DB');
  try {
    const newcheckpoint = await checkpointModel.create(checkpointInfo, {
      exists: false
    });
    return newcheckpoint;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
}

async function get(id: String) {
  console.log('Retrieving checkpoint by id: ', id);
  try {
    table.setContext({ routeId: id });
    const companyInfo = await checkpointModel.get({ checkpointId: id });
    return companyInfo;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  } finally {
    table.setContext({});
  }
}

async function list() {
  console.log('Listing all checkpoint items in DB');
  try {
    const checkpointList = await checkpointModel.find({}, { index: 'gs1' });
    return checkpointList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function listByRoute(id: String) {
  console.log('Listing checkpoints by route: ', id);
  try {
    table.setContext({ routeId: id });
    const checkpointList = await checkpointModel.find({});
    return checkpointList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  } finally {
    table.setContext({});
  }
}

async function remove(id: String) {
  console.log('Deleting checkpoint ', id);
  try {
    const removed = await checkpointModel.remove({ checkpointId: id });
    return removed;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}
export { get, list, listByRoute, create, remove };
