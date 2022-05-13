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

async function listByCompany(id: String) {
  console.log('Listing companies for company ', id);
  try {
    const companiesList = await CompanyModel.find(
      { companyId: id },
      { index: 'gs1' }
    );
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
export { list, listByCompany, get, create, update, remove };
