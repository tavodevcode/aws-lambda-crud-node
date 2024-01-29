const { v4 } = require("uuid");
const aws = require("aws-sdk");

const createTask = async (event) => {
  const dynamoDb = new aws.DynamoDB.DocumentClient();

  const id = v4();
  const { title, description } = JSON.parse(event.body);
  const createAt = new Date();

  const task = {
    id,
    title,
    description,
    createAt,
  };

  await dynamoDb
    .put({
      TableName: "TaskTable",
      Item: task,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(task),
  };
};

module.exports = {
  createTask,
};
