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
      driverId: { type: String, required: true, unique: true },
      name: { type: String, required: true },
      lastName: { type: String, required: true },
      companyId: { type: String, required: true },
      birthdate: { type: Date, required: false },
      // To search by company or type
      gs1pk: { type: String, value: 'driver#' },
      gs1sk: { type: String, value: 'driver#${companyId}#${id}' }
    },
    Vehicle: {
      pk: { type: String, value: 'vehicle#${plate}' },
      sk: { type: String, value: 'vehicle#${plate}' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      plate: { type: String, required: true, unique: true },
      status: { type: String, default: 'IDLE' },
      number: { type: String, required: true },
      company: { type: String, required: true },
      lastMaintenance: { type: Date, required: false },
      currentDriver: { type: String, default: 'NO_DRIVER' },
      // To search by company or type
      gs1pk: { type: String, value: 'vehicle#' },
      gs1sk: { type: String, value: 'vehicle#${company}#${id}' }
    },
    Company: {
      pk: { type: String, value: 'company#${companyId}' },
      sk: { type: String, value: 'company#${companyId}' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      companyId: { type: String, required: true, unique: true },
      phone: { type: String, required: true, validate: Match.phone },
      address: { type: String, required: true, validate: Match.address },
      email: { type: String, required: true, validate: Match.email },
      city: { type: String, required: true },
      // To search by city or type
      gs1pk: { type: String, value: 'company#' },
      gs1sk: { type: String, value: 'company#${city}#${id}' }
    },
    Route: {
      pk: { type: String, value: 'route#${routeId}' },
      sk: { type: String, value: 'route#${routeId}' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      routeId: { type: String, required: true, unique: true },
      origin: { type: String, required: true },
      destination: { type: String, required: true },
      geojson: { type: String, required: true },
      checkpoints: { type: Array, default: [] },
      // To search by origin, destination or type
      gs1pk: { type: String, value: 'route#' },
      gs1sk: { type: String, value: 'origin#${origin}#${id}' },
      gs2pk: { type: String, value: 'route#' },
      gs2sk: { type: String, value: 'destination#${destination}#${id}' }
    },
    Checkpoint: {
      pk: { type: String, value: 'checkpoint#${checkpointId}' },
      sk: { type: String, value: 'checkpoint#${checkpointId}' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      checkpointId: { type: String, required: true, unique: true },
      routes: { type: Array, default: [] },
      checkinHistory: { type: Array },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      geohash: { type: String, required: true },
      // To search by geohash or type
      gs1pk: { type: String, value: 'checkpoint#' },
      gs1sk: { type: String, value: 'geohash#${geohash}#${id}' }
    },
    Checkin: {
      pk: { type: String, value: 'checkpoint#${checkpointId}' },
      sk: { type: String, value: 'checkin#${timestamp}' },
      id: { type: String, generate: 'ulid', validate: Match.ulid },
      checkpointId: { type: String, required: true, unique: true },
      routeId: { type: String, required: true },
      timestamp: { type: Date, required: true },
      plate: { type: Date, required: true },
      driverId: { type: Date, required: true },
      // To search by type, vehicle or route
      gs1pk: { type: String, value: 'checkin#' },
      gs1sk: { type: String, value: 'route#${routeId}#${id}' },
      gs2pk: { type: String, value: 'checkin#' },
      gs2sk: { type: String, value: 'route#${plate}#${id}' }
    }
  },
  params: {
    isoDates: true,
    timestamps: true
  }
};

export default Schema;
