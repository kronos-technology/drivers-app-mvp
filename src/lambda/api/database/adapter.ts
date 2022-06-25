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
      getDriverById: [Driver, 'get', 'driverId'],
      listDrivers: [Driver, 'list', null],
      driversByCompany: [Driver, 'listByCompany', 'companyId'],
      createDriver: [Driver, 'create', 'driverInfo'],
      updateDriver: [Driver, 'update', 'driverUpdate'],
      deleteDriver: [Driver, 'delete', 'driverId'],
      // Vehicle
      getVehicleByPlate: [Vehicle, 'get', 'plate'],
      listVehicles: [Vehicle, 'list', null],
      vehiclesByCompany: [Vehicle, 'listByCompany', 'companyId'],
      createVehicle: [Vehicle, 'create', 'vehicleInfo'],
      updateVehicle: [Vehicle, 'update', 'vehicleUpdate'],
      deleteVehicle: [Vehicle, 'delete', 'plate'],
      // Company
      getCompanyById: [Company, 'get', 'companyId'],
      listCompanies: [Company, 'list', null],
      routesInCompany: [Company, 'getAssignedRoutes', 'routeInCompany'],
      createCompany: [Company, 'create', 'companyInfo'],
      updateCompany: [Company, 'update', 'companyUpdate'],
      deleteCompany: [Company, 'delete', 'companyId'],
      assignRouteInCompany: [Company, 'assignRoute', 'routeInCompany'],
      unassignRouteIncompany: [Company, 'unassignRoute', 'companyId'],
      // Route
      getRouteById: [Route, 'get', 'routeId'],
      listRoutes: [Route, 'list', null],
      routesByOrigin: [Route, 'listByOrigin', 'origin'],
      routesByDestination: [Route, 'listByDestination', 'destination'],
      createRoute: [Route, 'create', 'routeInfo'],
      updateRoute: [Route, 'update', 'routeUpdate'],
      deleteRoute: [Route, 'delete', 'routeId'],
      // Checkpoint
      getChekpointById: [Checkpoint, 'get', 'checkpointId'],
      listCheckpoints: [Checkpoint, 'list', null],
      routesInCheckpoint: [Checkpoint, 'getAssignedRoutes', 'checkpointId'],
      createCheckpoint: [Checkpoint, 'create', 'checkpointInfo'],
      updateCheckpoint: [Checkpoint, 'update', 'checkpointUpdate'],
      deleteCheckpoint: [Checkpoint, 'delete', 'checkpointId'],
      assignRouteInCheckpoint: [Checkpoint, 'assignRoute', 'routeInCheckpoint'],
      unassignRouteInCheckpoint: [
        Checkpoint,
        'unassignRoute',
        'routeInCheckpoint'
      ],
      // Checkin
      getCheckinById: [Checkin, 'get', 'checkinId'],
      checkinHistory: [Checkin, 'getCheckinHistory', 'checkpointId'],
      checkinHistoryByRoute: [
        Checkin,
        'getCheckinHistoryByRoute',
        'routeInCheckpoint'
      ],
      createCheckin: [Checkin, 'create', 'checkinInfo']
    };
    return resolvers[this.fieldName];
  }

  public async handleRequest() {
    const [itemClass, methodName, keyName] = this.getResolver();
    console.log(`Class: ${itemClass.name}. Method: ${methodName.name}`);
    const handler = new itemClass();
    const response = await handler[methodName](this.args[keyName]);
    console.log(`Response: ${JSON.stringify(response, null, 2)}`);
    return response;
  }
}

export { Vehicle } from './vehicle';
export { Route } from './route';
export { Driver } from './driver';
export { Company } from './company';
export { Checkpoint } from './checkpoint';
export { Checkin } from './checkin';
export { DbAdapter };

export type VehicleType = {
  plate: string;
  status: string;
  number: string;
  companyId: string;
  currentDriverId?: string;
};

export type RouteType = {
  routeId: string;
  origin: string;
  intermediates?: Array<string>;
  destination: string;
  geojson: string;
};

export type DriverType = {
  driverId: string;
  name: string;
  lastName: string;
  companyId: string;
  birthdate: string;
  phone: string;
};

export type CompanyType = {
  companyId: string;
  name: string;
  phone: string;
  address?: string;
  email?: string;
  city: string;
};

export type CheckpointType = {
  checkpointId: string;
  latitude: string;
  longitude: string;
  geohash: string;
  city: string;
  description: string;
};

export type CheckinType = {
  checkpointId: string;
  routeId: string;
  timestamp: string;
  plate: string;
  driverId: string;
  timeDifference?: string;
};
