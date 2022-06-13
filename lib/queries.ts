const driverQueries = ['getDriverById', 'listDrivers', 'driversByCompany'];

const vehicleQueries = [
  'getVehicleByPlate',
  'listVehicles',
  'vehiclesByCompany'
];

const companyQueries = ['getCompanyById', 'listCompanies', 'routesInCompany'];

const routeQueries = [
  'getRouteById',
  'listRoutes',
  'routesByOrigin',
  'routesByDestination'
];

const checkpointQueries = [
  'getCheckpointById',
  'listCheckpoints',
  'routesInCheckpoint'
];

const checkinQueries = [
  'getCheckinById',
  'checkinHistory',
  'checkinHistoryByRoute'
];

const queries: Array<string> = driverQueries.concat(
  vehicleQueries,
  companyQueries,
  routeQueries,
  checkinQueries,
  checkpointQueries
);

export { queries };
