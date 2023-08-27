const ApiBuilder = require("claudia-api-builder")
const AWS = require("aws-sdk")
const uuid = require("uuid")

const uuid4 = uuid.v4()
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
  (request) => {
    var params = {
      TableName: "comments",
      Item: {
        id: uuid4,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        movieId: request.body.movieId,
        userName: request.body.userName,
        userPhoto: request.body.userPhoto,
        description: request.body.description,
        likes: request.body.likes,
      },
    }
    return dynamoDb.put(params).promise()
  },
  { success: 201 }
)

api.get("/comments/{id}", async (request) => {
  const id = decodeURI(request.pathParams.id)
  const params = {
    TableName: "comments",
    Key: {
      id: id
    }
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
