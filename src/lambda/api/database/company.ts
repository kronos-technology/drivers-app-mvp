import BaseEntity, { EntityModel } from './base';
import { Model } from 'dynamodb-onetable';

class Company extends BaseEntity {
  routeModel: Model<EntityModel>;
  constructor(tableName?: string) {
    super({ tableName, modelName: 'COMPANY', idField: 'companyId' });
    this.routeModel = this.table.getModel<EntityModel>('ROUTEINCOMPANY');
    const ownPatterns = {
      'assign-route': this.assignRoute,
      'unassign-route': this.unassignRoute,
      'get-assigned-routes': this.getAssignedRoutes
    };
    this.accessPatterns = { ...super.accessPatterns, ...ownPatterns };
  }

  async assignRoute(companyId: string, routeId: string) {
    console.log(`Assigning route ${routeId} to company ${companyId}`);
    try {
      const assignedRoute = await this.routeModel.create({
        companyId,
        routeId
      });
      return assignedRoute;
    } catch (error) {
      console.log('DynamoDB error: ', error);
      return null;
    }
  }

  async unassignRoute(companyId: string, routeId: string) {
    console.log(`Unassigning route ${routeId} from company ${companyId}`);
    try {
      const unassignedRoute = await this.routeModel.remove({
        companyId: companyId,
        routeId: routeId
      });
      return unassignedRoute;
    } catch (error) {
      console.log('DynamoDB error: ', error);
      return null;
    }
  }

  async getAssignedRoutes(companyId: string) {
    console.log(`Listing routes assigned to company ${companyId}`);
    try {
      const assignedRoutes = await this.routeModel.find({ companyId });
      return assignedRoutes;
    } catch (error) {
      console.log('DynamoDB error: ', error);
      return null;
    }
  }
}
export { Company };
