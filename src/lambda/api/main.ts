import { DbAdapter } from './database/adapter';

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: object;
};

export const handler = async (event: AppSyncEvent) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  const fieldName = event.info.fieldName;
  const args = event.arguments;
  const db = new DbAdapter(fieldName, args);
  return await db.handleRequest();
};
