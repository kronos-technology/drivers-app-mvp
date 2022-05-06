import table from './util';

export type Vehicle = {
  plate: String;
  status: String;
  number: String;
  companyId: String;
  lastMaintenance?: String;
  currentDriverId?: String;
};
export type VehicleUpdate = {
  plate: String;
  status?: String;
  number?: String;
  companyId?: String;
  lastMaintenance?: String;
  currentDriverId?: String;
};

const VehicleModel = table.getModel('Vehicle');

async function create(vehicleInfo: Vehicle) {
  console.log('Creating new vehicle in database');
  try {
    const newVehicle = await VehicleModel.create(vehicleInfo, {
      exists: false
    });
    return newVehicle;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
}

async function getById(id: String) {
  console.log('Retreving vehicle with id: ', id);
  try {
    const vehicleInfo = await VehicleModel.get({ plate: id });
    console.log(vehicleInfo);
    return vehicleInfo;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function list() {
  console.log('Listing vehicles in database');
  try {
    const vehiclesList = await VehicleModel.find({}, { index: 'gs1' });
    return vehiclesList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function listByCompany(id: String) {
  console.log('Listing vehicles for company ', id);
  try {
    const vehiclesList = await VehicleModel.find(
      { companyId: id },
      { index: 'gs1' }
    );
    return vehiclesList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function update(data: VehicleUpdate) {
  console.log('Updating vehicle ', data.plate);
  try {
    const vehicle = await VehicleModel.update(data);
    return vehicle;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function remove(id: String) {
  console.log('Deleting vehicle ', id);
  try {
    const removed = await VehicleModel.remove({ plate: id });
    return removed;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}
export { list, listByCompany, getById, create, update, remove };
