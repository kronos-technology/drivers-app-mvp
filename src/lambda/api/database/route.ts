import BaseEntity, { EntityModel } from './base';
import { Model } from 'dynamodb-onetable';

class Route extends BaseEntity {
  routeInCheckpointModel: Model<EntityModel>;
  constructor(tableName?: string) {
    super({ tableName, modelName: 'ROUTE', idField: 'routeId' });
    this.routeInCheckpointModel =
      this.table.getModel<EntityModel>('ROUTEINCHECKPOINT');
    const ownPatterns = {
      'list-by-origin': this.listByOrigin,
      'list-by-destinatin': this.listByDestination
    };
    this.accessPatterns = { ...super.accessPatterns, ...ownPatterns };
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
