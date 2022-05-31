import { Company } from '../adapter';
import { EntityModel, CompanyType, Response } from '../base';

const companyTestData: Array<CompanyType> = [
  {
    companyId: 'SABANA',
    phone: '+576012635301',
    address: 'DIAGONAL 23 69 60 OF 702',
    name: 'Expreso De La Sabana SAS',
    city: 'Bogota'
  },
  {
    companyId: 'AYACUCHO',
    phone: '+576014203733',
    address: 'Carrera 2 # 15 - 31',
    name: 'Flota Ayacucho LTDA',
    city: 'Facatativa'
  },
  {
    companyId: 'VILLETAX',
    phone: '+576018901288',
    address: 'Carrera 3 # 9 - 35',
    name: 'Transportes Villetax SA',
    city: 'Facatativa'
  }
];

describe('company tests', () => {
  let companyManager: Company;

  beforeAll(async () => {
    companyManager = new Company();
  });

  test('create test companies', async () => {
    let createdCompanies: Array<EntityModel | Response> = [];
    for (const companyInfo of companyTestData) {
      const created = await companyManager.create(companyInfo);
      createdCompanies.push(created);
      console.log(`company created ${JSON.stringify(created, null, 2)}`);
      expect(created).toBeDefined();
    }
    expect(createdCompanies).toHaveLength(companyTestData.length);
    await new Promise((r) => setTimeout(r, 2000));
  });

  test('list all companies', async () => {
    const list = await companyManager.list();
    console.log(`List of all companies: ${JSON.stringify(list, null, 2)}`);
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(companyTestData.length);
  });

  test('get company', async () => {
    const companyId: string = companyTestData[0].companyId;
    const company: EntityModel | undefined = await companyManager.get(
      companyId
    );
    console.log(`Company info ${JSON.stringify(company, null, 2)}`);
    expect(company).toBeDefined();
  });

  test('assign route to company', async () => {
    const companyId: string = companyTestData[0].companyId;
    const routeId: string = 'FACATA-VTEMAD-BOGOTA-13';
    const assignedRoute = await companyManager.assignRoute(companyId, routeId);
    console.log(`Route ${routeId} assigned to company ${companyId} `);
    expect(assignedRoute).toBeDefined();
  });

  test('get assigned routes to company', async () => {
    const companyId: string = companyTestData[0].companyId;
    const routeId: string = 'FACATA-VTEMAD-BOGOTA-13';
    const assignedRoutes = await companyManager.getAssignedRoutes(companyId);
    const _routes = JSON.stringify(assignedRoutes, null, 2);
    console.log(`Routes assigned to company: ${routeId}: ${_routes}`);
    expect(assignedRoutes).toBeDefined();
  });

  test('unassign route from company', async () => {
    const companyId: string = companyTestData[0].companyId;
    const routeId: string = 'FACATA-VTEMAD-BOGOTA-13';
    const unassignedRoute = await companyManager.unassignRoute(
      companyId,
      routeId
    );
    const route = JSON.stringify(unassignedRoute, null, 2);
    console.log(`Route unassigned from company: ${routeId}: ${route}`);
  });

  test('delete company', async () => {
    let deletedCompanys: Array<EntityModel | Response | undefined> = [];
    for (const companyInfo of companyTestData) {
      const companyId: string = companyInfo.companyId;
      const deleted = await companyManager.delete(companyId);
      deletedCompanys.push(deleted);
      console.log(`company deleted ${JSON.stringify(deleted, null, 2)}`);
      expect(deleted).toBeDefined();
    }
    expect(deletedCompanys).toHaveLength(companyTestData.length);
    await new Promise((r) => setTimeout(r, 2000));
  });
  // required with this small example
});
