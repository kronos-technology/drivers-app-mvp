import {
  Checkin,
  Checkpoint,
  Company,
  Driver,
  Route,
  Vehicle
} from './database/adapter';

export const handler = async (event) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  return {
    statusCode: 200,
    body: `You hit ${event.path}`
  };
};
