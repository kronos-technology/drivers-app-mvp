import { Checkin, CheckinType } from './database/adapter';

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: { checkinInfo: CheckinType };
};

class CheckinRecorder {
  checkinData: CheckinType;
  constructor(data: CheckinType) {
    this.checkinData = data;
  }

  private async getLatestCheckin() {}

  private calculateTimeDifference() {}

  private formatResponse() {}

  public async processCheckin() {}
}

export const handler = async (event: AppSyncEvent) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  const data = event.arguments.checkinInfo;
  const recorder = new CheckinRecorder(data);
  const response = await recorder.processCheckin();
  console.log(`Response: ${JSON.stringify(response, null, 2)}`);
  return response;
};
