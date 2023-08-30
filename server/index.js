const ApiBuilder = require("claudia-api-builder")
const AWS = require("aws-sdk")
const uuid = require("uuid")

// const uuid4 = uuid.v4()
var api = new ApiBuilder()
var dynamoDb = new AWS.DynamoDB.DocumentClient()
api.get("/comments", async () => {
  const res = await dynamoDb
    .scan({
      TableName: "comments",
    })
    .promise()
  return res.Items
})

api.post(
  "/comments",
  async (request) => {
    var params = {
      TableName: "comments",
      Item: {
        id: uuid.v4(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        movieId: request.body.movieId,
        userName: request.body.userName,
        userPhoto: request.body.userPhoto,
        description: request.body.description,
        likes: request.body.likes,
      },
    }
    const res = await dynamoDb.put(params).promise()
    return res
  },
  { success: 201 }
)

api.get("/comments/{id}", async (request) => {
  const id = decodeURI(request.pathParams.id)
  const params = {
    TableName: "comments",
    Key: {
      id: id,
    },
  }
  const res = await dynamoDb.get(params).promise()
  return res
})

api.put(
  "/comments/{id}",
  async (request) => {
    const id = decodeURI(request.pathParams.id)
    const params = {
      TableName: "comments",
      Item: {
        id: id,
        ...request.body,
      },
    }
    await dynamoDb.put(params).promise()
    return id
  },
  { success: { contentType: "text/plain" } }
)

api.patch(
  "/comments/{id}",
  async (request) => {
    const id = decodeURI(request.pathParams.id)
    const params = {
      TableName: "comments",
      Key: {
        id: id,
      },
      UpdateExpression: "SET likes = :likes",
      ExpressionAttributeValues: {
        ":likes": request.body.likes,
      },
    }
    await dynamoDb.update(params).promise()
    return id
  },
  { success: { contentType: "text/plain" } }
)

api.delete(
  "/comments/{id}",
  async (request) => {
    const id = decodeURI(request.pathParams.id)
    const params = {
      TableName: "comments",
      Key: {
        id: id,
      },
    }
    await dynamoDb.delete(params).promise()
    return id
  },
  { success: { contentType: "text/plain" } }
)

module.exports = api
