import BaseEntity, { EntityModel } from './base';
import { Model } from 'dynamodb-onetable';

class Route extends BaseEntity {
  routeInCheckpointModel: Model<EntityModel>;
  constructor(tableName?: string) {
    super({ tableName, modelName: 'ROUTE', idField: 'routeId' });
    this.routeInCheckpointModel =
      this.table.getModel<EntityModel>('ROUTEINCHECKPOINT');
  }

  async getCheckpoints(routeId: string) {
    console.log(`Retrieving checkpoints in route: ${routeId}`);
    try {
      const checkpoints = await this.routeInCheckpointModel.find(
        { routeId },
        { index: 'gs1' }
      );
      return checkpoints;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      return null;
    }
  }

  async listByOrigin(origin: string) {
    console.log(`Listing routes with origin ${origin}`);
    try {
      const routesList = await this.model.find({ origin }, { index: 'gs1' });
      return routesList;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      return null;
    }
  }

  async listByDestination(destination: string) {
    console.log(`Listing routes with destination ${destination}`);
    try {
      const routesList = await this.model.find(
        { destination },
        { index: 'gs2' }
      );
      return routesList;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      return null;
    }
  }
}

export { Route };
