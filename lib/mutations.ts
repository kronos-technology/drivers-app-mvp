const driverMutations = ['createDriver', 'updateDriver', 'deleteDriver'];
const vehicleMutations = ['createVehicle', 'updateVehicle', 'deleteVehicle'];
const companyMutations = [
  'createCompany',
  'updateCompany',
  'deleteCompany',
  'assignRouteInCompany',
  'unassignRouteInCompany'
];
const routeMutations = ['createRoute', 'updateRoute', 'deleteRoute'];
const checkpointMutations = [
  'createCheckpoint',
  'updateCheckpoint',
  'deleteCheckpoint',
  'assignRouteInCheckpoint',
  'unassignRouteInCheckpoint'
];
const checkinMutations = ['createCheckin'];
const mutations = vehicleMutations.concat(
  driverMutations,
  companyMutations,
  routeMutations,
  checkpointMutations
);
export { mutations };
