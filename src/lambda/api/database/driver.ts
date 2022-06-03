import BaseEntity from './base';

class Driver extends BaseEntity {
  constructor(tableName?: string) {
    super({ tableName, modelName: 'DRIVER', idField: 'driverId' });
    const ownPatterns = { 'list-by-company': this.listByCompany };
    this.accessPatterns = { ...super.accessPatterns, ...ownPatterns };
  }

  async listByCompany(companyId) {
    console.log(`Listing drivers for company ${companyId}`);
    try {
      const listByCompany = await this.model.find(
        { companyId },
        { index: 'gs1' }
      );
      return listByCompany;
    } catch (error) {
      console.log('DynamoDB error: ', error);
      return null;
    }
  }
}

export { Driver };
