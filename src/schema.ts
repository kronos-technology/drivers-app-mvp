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
      driverId: { type: String, required: true },
      name: { type: String, required: true },
      lastName: { type: String, required: true },
      company: { type: String, required: true },
      birthdate: { type: Date, required: false }
    },
    Vehicle: {
      pk: { type: String, value: 'vehicle#${plate}' },
      sk: { type: String, value: 'vehicle#${plate}' },
      plate: { type: String, required: true },
      status: { type: String, default: 'IDLE' },
      number: { type: String, required: true },
      company: { type: String, required: true },
      lastMaintenance: { type: Date, required: false },
      currentDriver: { type: String, default: 'NO_DRIVER' }
    },
    Coordinates: {
      pk: { type: String, value: 'vehicle#{plate}' },
      sk: { type: String, value: 'coords#{timestamp}' },
      plate: { type: String, required: true },
      timestamp: { type: Date, required: true },
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
      geohash: { type: String, required: true }
    },
    Company: {
      pk: { type: String, value: 'company#${companyId}' },
      sk: { type: String, value: 'company#${companyId}' },
      companyId: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true }
    },
    Route: {
      pk: { type: String, value: 'route#${route_id}' },
      sk: { type: String, value: 'route#${route_id}' },
      routeId: { type: String, required: true },
      origin: { type: String, required: true },
      destination: { type: String, required: true },
      geojson: { type: String, required: true }
    },
    RouteSnapshot: {
      pk: { type: String, value: 'route#${route_id}' },
      sk: { type: String, value: 'snapshot#${timestamp}' },
      routeId: { type: String, required: true },
      timestamp: { type: Date, required: true },
      positionsMap: { type: Object, required: true },
      routeStatus: { type: Array, required: true }
    }
  },
  params: {
    isoDates: true,
    timestamps: true
  }
};

export default Schema;
