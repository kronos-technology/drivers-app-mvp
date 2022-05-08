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
    Driver: {
      pk: { type: String, value: 'driver#${driverId}' },
      sk: { type: String, value: 'driver#${driverId}' },
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
    Vehicle: {
      pk: { type: String, value: 'vehicle#${plate}' },
      sk: { type: String, value: 'vehicle#${plate}' },
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
    Company: {
      pk: { type: String, value: 'company#${companyId}' },
      sk: { type: String, value: 'company#${companyId}' },
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
    Route: {
      pk: { type: String, value: 'route#${routeId}' },
      sk: { type: String, value: 'route#${routeId}' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      routeId: { type: String, required: true },
      origin: { type: String, required: true },
      destination: { type: String, required: true },
      geojson: { type: String, required: true },
      // To search by origin, destination or type
      gs1pk: { type: String, value: 'route#' },
      gs1sk: { type: String, value: 'origin#${origin}' },
      gs2pk: { type: String, value: 'route#' },
      gs2sk: { type: String, value: 'destination#${destination}' }
    },
    Checkpoint: {
      pk: { type: String, value: 'route#${routeId}' },
      sk: { type: String, value: 'checkpoint#${checkpointId}' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      checkpointId: { type: String, required: true },
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
      geohash: { type: String, required: true },
      // To search by geohash or type
      gs1pk: { type: String, value: 'checkpoint#' },
      gs1sk: { type: String, value: 'geohash#${geohash}' }
    },
    Checkin: {
      pk: { type: String, value: 'checkpoint#${checkpointId}' },
      sk: { type: String, value: 'checkin#${timestamp}' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      checkpointId: { type: String, required: true },
      routeId: { type: String, required: true },
      timestamp: { type: Date, required: true },
      plate: { type: String, required: true },
      driverId: { type: String, required: true },
      // To search by type, vehicle or route
      gs1pk: { type: String, value: 'checkin#' },
      gs1sk: { type: String, value: 'route#${routeId}' },
      gs2pk: { type: String, value: 'checkin#' },
      gs2sk: { type: String, value: 'route#${plate}' }
    }
  },
  params: {
    isoDates: true,
    timestamps: true
  }
};

export default Schema;
