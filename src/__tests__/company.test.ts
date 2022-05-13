import * as companyLib from '../company';

test('Create company', async () => {
  const data: Array<companyLib.Company> = [
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
  for (const item of data) {
    const response = await companyLib.create(item);
    expect(response).toBeDefined();
  }
  await new Promise((r) => setTimeout(r, 2000));
});

test('List companies', async () => {
  const response = await companyLib.list();
  console.log(response);
  expect(response).toBeInstanceOf(Array);
});

test('Get company', async () => {
  const id = 'SABANA';
  const response = await companyLib.get(id);
  console.log(response);
  expect(response).toBeDefined();
});

test('Update company', async () => {
  const id = 'SABANA';
  const email = 'operacionesflotaayacucho@gmail.com';
  const updateData: companyLib.CompanyUpdate = { companyId: id, email: email };
  const response = await companyLib.update(updateData);
  console.log(response);
  expect(response).toBeDefined();
});

test('Delete company', async () => {
  const id = 'SABANA';
  const company = await companyLib.get(id);
  const removed = await companyLib.remove(id);
  console.log('company removed: ', removed);
  expect(removed).toEqual(company);
});
// required with this small example
// to make the isolatedModules config happy
export {};
