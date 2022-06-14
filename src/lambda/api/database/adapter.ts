import { Checkin } from './checkin';
import { Checkpoint } from './checkpoint';
import { Company } from './company';
import { Driver } from './driver';
import { Route } from './route';
import { Vehicle } from './vehicle';

class DbAdapter {
  fieldName: string;
  args: object;
  resolver: Function;
  params: object;

  constructor(fieldName: string, args: object) {
    this.fieldName = fieldName;
    this.args = args;
    this.resolver = this.getFieldResolver(fieldName);
  }

  private getFieldResolver(fieldName: string) {
    const resolversMap: object = {
      // Driver
      getDriverById: new Driver().get,
      listDrivers: new Driver().list,
      driversByCompany: new Driver().listByCompany,
      createDriver: new Driver().create,
      updateDriver: new Driver().update,
      deleteDriver: new Driver().delete,
      // Vehicle
      getVehicleByPlate: new Vehicle().get,
      listVehicles: new Vehicle().list,
      vehiclesByCompany: new Vehicle().listByCompany,
      createVehicle: new Vehicle().create,
      updateVehicle: new Vehicle().update,
      deleteVehicle: new Vehicle().delete,
      // Company
      getCompanyById: new Company().get,
      listCompanies: new Company().list,
      routesInCompany: new Company().getAssignedRoutes,
      createCompany: new Company().create,
      updateCompany: new Company().update,
      deleteCompany: new Company().delete,
      // Route
      getRouteById: new Route().get,
      listRoutes: new Route().list,
      routesByOrigin: new Route().listByOrigin,
      routesByDestination: new Route().listByDestination,
      createRoute: new Route().create,
      updateRoute: new Route().update,
      deleteRoute: new Route().delete,
      // Checkpoint
      getChekpointById: new Checkpoint().get,
      listCheckpoints: new Checkpoint().list,
      routesInCheckpoint: new Checkpoint().getAssignedRoutes,
      createCheckpoint: new Checkpoint().create,
      updateCheckpoint: new Checkpoint().update,
      deleteCheckpoint: new Checkpoint().delete,
      assignRouteInCheckpoint: new Checkpoint().assignRoute,
      unassignRouteInCheckpoint: new Checkpoint().unassignRoute,
      // Checkin
      getCheckinById: new Checkin().get,
      checkinHistory: new Checkin().getCheckinHistory,
      checkinHistoryByRoute: new Checkin().getCheckinHistoryByRoute,
      createCheckin: new Checkin().create
    };

    const resolver: Function = resolversMap[fieldName];
    console.log(`Handler method: ${resolver.name}`);

    return resolver;
  }

  public handleRequest() {
    const result = this.resolver(this.args);
    console.log(`Result ${JSON.stringify(result, null, 2)}`);
    return result;
  }
}

export { Vehicle } from './vehicle';
export { Route } from './route';
export { Driver } from './driver';
export { Company } from './company';
export { Checkpoint } from './checkpoint';
export { Checkin } from './checkin';
export { DbAdapter };
