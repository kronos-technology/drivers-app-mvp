import BaseEntity from './base';

class Vehicle extends BaseEntity {
  constructor(tableName?: string) {
    super({ tableName, modelName: 'VEHICLE', idField: 'plate' });
  }

  async listByCompany(companyId) {
    console.log(`Listing vehicles for company ${companyId.toLowerCase()}`);
    try {
      const listByCompany = await this.model.find(
        { companyId },
        { index: 'gs1' }
      );
      return listByCompany;
    } catch (error) {
      console.error('DynamoDB error: ', error);
      return null;
    }
  }
}

export { Vehicle };
