import BaseEntity, { EntityModel } from './base';
import { Model } from 'dynamodb-onetable';

class Checkpoint extends BaseEntity {
  routeModel: Model<EntityModel>;
  constructor(tableName?: string) {
    super({ tableName, modelName: 'CHECKPOINT', idField: 'checkpointId' });
    this.routeModel = this.table.getModel<EntityModel>('ROUTEINCHECKPOINT');
    const ownPatterns = {
      'assign-route': this.assignRoute,
      'unassign-route': this.unassignRoute,
      'get-assigned-routes': this.getAssignedRoutes
    };
    this.accessPatterns = { ...super.accessPatterns, ...ownPatterns };
  }

  async assignRoute(checkpointId: string, routeId: string) {
    console.log(`Assigning route ${routeId} to checkpoint ${checkpointId}`);
    try {
      const assignedRoute = await this.routeModel.create({
        checkpointId,
        routeId
      });
      return assignedRoute;
    } catch (error) {
      console.log('DynamoDB error: ', error);
      return null;
    }
  }

  async unassignRoute(checkpointId: string, routeId: string) {
    console.log(`Unassigning route ${routeId} from checkpoint ${checkpointId}`);
    try {
      const unassignedRoute = await this.routeModel.remove({
        checkpointId: checkpointId,
        routeId: routeId
      });
      return unassignedRoute;
    } catch (error) {
      console.log('DynamoDB error: ', error);
      return null;
    }
  }

  async getAssignedRoutes(checkpointId: string) {
    console.log(`Listing routes assigned to checkpoint ${checkpointId}`);
    try {
      const assignedRoutes = await this.routeModel.find({ checkpointId });
      return assignedRoutes;
    } catch (error) {
      console.log('DynamoDB error: ', error);
      return null;
    }
  }
}
export { Checkpoint };
