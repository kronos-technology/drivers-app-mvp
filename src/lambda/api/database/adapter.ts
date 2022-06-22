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
  }

  private getResolver() {
    const resolvers = {
      // Driver
      getDriverById: [Driver, 'get', ''],
      listDrivers: [Driver, 'list'],
      driversByCompany: [Driver, 'listByCompany'],
      createDriver: [Driver, 'create', 'driver'],
      updateDriver: [Driver, 'update'],
      deleteDriver: [Driver, 'delete'],
      // Vehicle
      getVehicleByPlate: [Vehicle, 'get'],
      listVehicles: [Vehicle, 'list'],
      vehiclesByCompany: [Vehicle, 'listByCompany'],
      createVehicle: [Vehicle, 'create'],
      updateVehicle: [Vehicle, 'update'],
      deleteVehicle: [Vehicle, 'delete'],
      // Company
      getCompanyById: [Company, 'get'],
      listCompanies: [Company, 'list'],
      routesInCompany: [Company, 'getAssignedRoutes'],
      createCompany: [Company, 'create'],
      updateCompany: [Company, 'update'],
      deleteCompany: [Company, 'delete'],
      // Route
      getRouteById: [Route, 'get'],
      listRoutes: [Route, 'list'],
      routesByOrigin: [Route, 'listByOrigin'],
      routesByDestination: [Route, 'listByDestination'],
      createRoute: [Route, 'create'],
      updateRoute: [Route, 'update'],
      deleteRoute: [Route, 'delete'],
      // Checkpoint
      getChekpointById: [Checkpoint, 'get'],
      listCheckpoints: [Checkpoint, 'list'],
      routesInCheckpoint: [Checkpoint, 'getAssignedRoutes'],
      createCheckpoint: [Checkpoint, 'create'],
      updateCheckpoint: [Checkpoint, 'update'],
      deleteCheckpoint: [Checkpoint, 'delete'],
      assignRouteInCheckpoint: [Checkpoint, 'assignRoute'],
      unassignRouteInCheckpoint: [Checkpoint, 'unassignRoute'],
      // Checkin
      getCheckinById: [Checkin, 'get'],
      checkinHistory: [Checkin, 'getCheckinHistory'],
      checkinHistoryByRoute: [Checkin, 'getCheckinHistoryByRoute'],
      createCheckin: [Checkin, 'create']
    };
    return resolvers[this.fieldName];
  }
  public async handleRequest() {
    const [itemClass, methodName, keyName] = this.getResolver();
    console.log(`Class: ${itemClass.name}. Method: ${methodName.name}`);
    const handler = new itemClass();
    const result = await handler[methodName](this.args[keyName]);
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
