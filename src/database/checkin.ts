import BaseEntity, { EntityModel, Response } from './base';

class Checkin extends BaseEntity {
  constructor(tableName?: string) {
    super({ tableName, modelName: 'CHECKIN' });
  }

  override async create(data: any): Promise<EntityModel | Response> {
    const daysToRetain = 2;
    const creationDate = new Date(Date.parse(data.timestamp));
    const expirationDate: Date = creationDate;
    expirationDate.setDate(creationDate.getDate() + daysToRetain);
    data['expire'] = expirationDate;
    return super.create(data);
  }

  async getCheckinHistory(checkpointId: string, limit: number = 10) {
    console.log(`Listing checkins in checkpoint ${checkpointId}`);
    try {
      //      this.table.setContext({ checkpointId });
      const checkinList = await this.model.find(
        { pk: `checkpoint#${checkpointId}`, sk: { begins: `checkin#` } },
        {
          limit,
          reverse: true,
          log: true
        }
      );
      return checkinList;
    } catch (error) {
      console.error(`DynamoDB error ${error}`);
      return null;
    } finally {
      //     this.table.clearContext();
    }
  }

  async getCheckinHistoryByRoute(
    checkpointId: string,
    routeId: string,
    limit: number = 10
  ) {
    console.log(
      `Listing checkins in checkpoint ${checkpointId} for the route ${routeId}`
    );
    try {
      const checkinList = await this.model.find(
        {
          pk: `checkpoint#${checkpointId}`,
          sk: { begins: `checkin#${routeId}` }
        },
        {
          limit,
          reverse: true,
          log: true
        }
      );
      return checkinList;
    } catch (error) {
      console.error(`DynamoDB error ${error}`);
      return null;
    } finally {
      this.table.clearContext();
    }
  }
}

export { Checkin };
