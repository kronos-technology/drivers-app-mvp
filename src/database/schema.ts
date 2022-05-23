/*
    Overview schema
*/

const Match = {
  ulid: /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  name: /^[a-z0-9 ,.'-]+$/i,
  address: /[a-z0-9 ,.-]+$/,
  zip: /^\d{5}(?:[-\s]\d{4})?$/,
  phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
};

const Schema = {
  version: '0.0.1',
  indexes: {
    primary: { hash: 'pk', sort: 'sk' },
    gs1: { hash: 'gs1pk', sort: 'gs1sk' },
    gs2: { hash: 'gs2pk', sort: 'gs2sk' }
  },
  models: {
    DRIVER: {
      pk: { type: String, value: 'driver#${driverId}' },
      sk: { type: String, value: 'driver' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      driverId: { type: String, required: true },
      name: { type: String, required: true },
      lastName: { type: String, required: true },
      companyId: { type: String, required: true },
      birthdate: { type: Date, required: false },
      phone: { type: String, required: true, validate: Match.phone },
      // To search by company or type
      gs1pk: { type: String, value: 'driver#' },
      gs1sk: { type: String, value: 'driver#${companyId}' }
    },
    VEHICLE: {
      pk: { type: String, value: 'vehicle#${plate}' },
      sk: { type: String, value: 'vehicle#' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      plate: { type: String, required: true },
      status: { type: String, default: 'idle' },
      number: { type: String, required: true },
      companyId: { type: String, required: true },
      lastMaintenance: { type: Date, required: false },
      currentDriverId: { type: String, default: 'no_driver' },
      // To search by company or type
      gs1pk: { type: String, value: 'vehicle#' },
      gs1sk: { type: String, value: 'vehicle#${companyId}' }
    },
    COMPANY: {
      pk: { type: String, value: 'company#${companyId}' },
      sk: { type: String, value: 'company#' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      companyId: { type: String, required: true },
      phone: { type: String, required: true, validate: Match.phone },
      address: { type: String, required: true, validate: Match.address },
      email: { type: String, validate: Match.email },
      city: { type: String, required: true },
      // To search by city or type
      gs1pk: { type: String, value: 'company#' },
      gs1sk: { type: String, value: 'company#${city}' }
    },
    ROUTE: {
      pk: { type: String, value: 'route#${id}' },
      sk: { type: String, value: 'route#' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      routeId: { type: String, required: true },
      origin: { type: String, required: true },
      destination: { type: String, required: true },
      intermediates: { type: Set, default: [] },
      geojson: { type: String, required: true },
      // To search by origin, company or type
      gs1pk: { type: String, value: 'route#' },
      gs1sk: { type: String, value: 'origin#${origin}' },
      gs2pk: { type: String, value: 'route#' },
      gs2sk: { type: String, value: 'destination#${destination}' }
    },
    // RouteInCompany represents a route assigned
    // to a company. It helps to model the many-to-many
    // relation between routes and companies
    ROUTEINCOMPANY: {
      pk: { type: String, value: 'company#${companyId}' },
      sk: { type: String, value: 'route#${routeId}' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      companyId: { type: String, required: true },
      routeId: { type: String, required: true },
      // To search all companies assigned to a route,
      gs1pk: { type: String, value: 'route#${routeId}' },
      gs1sk: { type: String, value: 'route#company' }
    },
    CHECKPOINT: {
      pk: { type: String, value: 'checkpoint#${checkpointId}' },
      sk: { type: String, value: 'checkpoint#' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      checkpointId: { type: String, required: true },
      description: { type: String, required: true },
      latitude: { type: String, default: ' ' },
      longitude: { type: String, required: true },
      geohash: { type: String, required: true },
      // To search by geohash or type
      gs1pk: { type: String, value: 'checkpoint#' },
      gs1sk: { type: String, value: 'geohash#${geohash}' }
    },
    // CheckpointInRoute represents a checkpoint contained
    // in a route. It helps to model the many-to-many
    // relation between checkpoints and routes
    ROUTEINCHECKPOINT: {
      pk: { type: String, value: 'checkpoint#${checkpointId}' },
      sk: { type: String, value: 'route#${routeId}' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      checkpointId: { type: String, required: true },
      routeId: { type: String, required: true },
      // To search all routes monitored by one checkpoint
      // and filter by destination
      gs1pk: { type: String, value: 'route#${routeId}' },
      gs1sk: { type: String, value: 'route#checkpoint' }
    },
    CHECKIN: {
      pk: { type: String, value: 'checkpoint#${checkpointId}' },
      sk: { type: String, value: '${timestamp}#${plate}' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      checkpointId: { type: String, required: true },
      routeId: { type: String, required: true },
      timestamp: { type: Date, required: true },
      plate: { type: String, required: true },
      driverId: { type: String, required: true },
      // To search by type, vehicle or route
      gs1pk: { type: String, value: 'checkin#' },
      gs1sk: { type: String, value: '${timestamp}#${routeId}' },
      gs2pk: { type: String, value: 'checkin#' },
      gs2sk: { type: String, value: '${timestamp}#${plate}' }
    }
  },
  params: {
    isoDates: true,
    timestamps: true
  }
};

export default Schema;
