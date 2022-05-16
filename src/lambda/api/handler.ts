export const lambdaHandler = (event) => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  return {
    statusCode: 200,
    body: `You hit ${event.path}`
  };
};
