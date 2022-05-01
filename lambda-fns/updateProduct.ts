const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

type Params = {
  TableName: string | undefined;
  Key: string | {};
  ExpressionAttributeValues: any;
  ExpressionAttributeNames: any;
  UpdateExpression: string;
  ReturnValues: string;
};

async function updateProduct(product: any) {
  const params: Params = {
    TableName: process.env.PRODUCT_TABLE,
    Key: {
      id: product.id
    },
    UpdateExpression: '',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW'
  };
  let prefix = 'set ';
  const attributes = Object.keys(product);
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i];
    if (attribute !== 'id') {
      params['UpdateExpression'] +=
        prefix + '#' + attribute + ' = :' + attribute;
      params['ExpressionAttributeValues'][':' + attribute] = product[attribute];
      params['ExpressionAttributeNames']['#' + attribute] = attribute;
      prefix = ', ';
    }
  }
  try {
    await docClient.update(params).promise();
    return product;
  } catch (err) {
    console.log('DynamoDB error: ', err);
    return null;
  }
}

export default updateProduct;
