import table from './util';

export type Company = {
  companyId: String;
  name: String;
  phone: String;
  address?: String;
  email?: String;
  city: String;
};

export type CompanyUpdate = {
  companyId: String;
  name?: String;
  phone?: String;
  address?: String;
  email?: String;
  city?: String;
};
const CompanyModel = table.getModel('Company');
const RouteInCompany = table.getModel('RouteInCompany');

async function create(companyInfo: Company) {
  console.log('Creating new company in database');
  try {
    const newCompany = await CompanyModel.create(companyInfo, {
      exists: false
    });
    return newCompany;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
}

async function get(id: String) {
  console.log('Retrieving company with id: ', id);
  try {
    const companyInfo = await CompanyModel.get({ companyId: id });
    console.log(companyInfo);
    return companyInfo;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function list() {
  console.log('Listing companies in database');
  try {
    const companiesList = await CompanyModel.find({}, { index: 'gs1' });
    return companiesList;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function update(data: CompanyUpdate) {
  console.log('Updating company ', data.companyId);
  try {
    const company = await CompanyModel.update(data);
    return company;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function remove(id: String) {
  console.log('Deleting company ', id);
  try {
    const removed = await CompanyModel.remove({ companyId: id });
    return removed;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function assignRoute(companyId: String, routeId: String) {
  try {
    const addedRoute = await RouteInCompany.create({
      companyId: companyId,
      routeId: routeId
    });
    return addedRoute;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function unassignRoute(companyId: String, routeId: String) {
  console.log(`Deleting route ${routeId} from company ${companyId}`);
  try {
    const removedRoute = await RouteInCompany.remove({
      companyId: companyId,
      routeId: routeId
    });
    return removedRoute;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}

async function getAssignedRoutes(companyId: String) {
  console.log(`Retrieving routes assigned to company ${companyId}`);
  try {
    const assignedRoutes = await RouteInCompany.find({ companyId });
    return assignedRoutes;
  } catch (error) {
    console.log('DynamoDB error: ', error);
    return null;
  }
}
export {
  list,
  get,
  create,
  update,
  remove,
  assignRoute,
  getAssignedRoutes,
  unassignRoute
};
