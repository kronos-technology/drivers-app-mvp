import BaseEntity, { EntityModel, Response } from './base';

class Checkin extends BaseEntity {
  constructor(tableName?: string) {
    super({ tableName, modelName: 'CHECKIN' });
    const ownPatterns = {
      create: this.create,
      'get-history': this.getCheckinHistory,
      'get-history-by-route': this.getCheckinHistoryByRoute,
      'delete-history': this.deleteCheckinHistory
    };
    this.accessPatterns = { ...super.accessPatterns, ...ownPatterns };
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

  async deleteCheckinHistory() {
    console.log('Deleting all checkins in DB');
    try {
      const checkinHistory = await this.model.remove(
        { gs1pk: 'checkin#' },
        { index: 'gs1', hidden: true, many: true }
      );
      const _history = JSON.stringify(checkinHistory, null, 2);
      console.log(`Deleted Checkin history: ${_history}`);
      return checkinHistory;
    } catch (error) {
      console.error(`DynamoDB error ${error}`);
      return null;
    }
  }
}

export { Checkin };
