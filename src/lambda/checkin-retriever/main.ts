import { Checkin, CheckinType } from '../api/database/adapter';

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: { checkinInfo: CheckinType };
};

class CheckinRetriever {
  data: CheckinType;
  checkinManager: Checkin;

  constructor(data: CheckinType) {
    this.data = data;
    this.checkinManager = new Checkin();
  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  private convertMsToMinutesSeconds(milliseconds: number) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
      ? `${minutes + 1}:00`
      : `${minutes}:${this.padTo2Digits(seconds)}`;
  }

  private async getLatestCheckins() {
    const latest = this.checkinManager.getCheckinHistoryByRoute(
      this.data.checkpointId,
      this.data.routeId,
      1
    );
    return latest;
  }

  private calculateTimeDifference(
    checkinTimestamp: string,
    historyTimestamp: string
  ): string {
    const currentCheckin = new Date(historyTimestamp);
    const lastCheckin = new Date(checkinTimestamp);

    const msDifference = currentCheckin.getTime() - lastCheckin.getTime();
    return this.convertMsToMinutesSeconds(msDifference);
  }

  public async respond() {
    const lastCheckin = await this.getLatestCheckins()[0];
    const difference = this.calculateTimeDifference(
      this.data.timestamp,
      lastCheckin['timestamp']
    );
    this.data.timeDifference = difference;
    return this.data;
  }
}

export const handler = async (event: AppSyncEvent) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  const data = event.arguments.checkinInfo;
  const retriever = new CheckinRetriever(data);
  const response = await retriever.respond();
  console.log(`Response: ${JSON.stringify(response, null, 2)}`);
  return response;
};
