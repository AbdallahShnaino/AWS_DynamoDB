const AWS = require('aws-sdk')
require('dotenv').config()
AWS.config.update({
    region:process.env.AWS_DEFAULT_REASION,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TABEL_NAME = "User"

async function scannTabel () {
    const params = {
        TableName:TABEL_NAME
    }
    const users = await dynamoClient.scan(params).promise()
    console.log(users)
    return users
}
async function addOrUpdateUser (user) {
    const params = {
        TableName:TABEL_NAME,
        Item:user
    }
    var user = await dynamoClient.put(params).promise()
    console.log(user)
    return user
}
async function getUserById (id) {
    var id = String(id)
    if (id){
        const params = {
            TableName:TABEL_NAME,
            Key:{
                id
            }
        }
        var user = await dynamoClient.get(params).promise()
        console.log(user)
        return user
    }

}

async function deleteUserById (id) {
    var id = String(id)
    if (id){
        const params = {
            TableName:TABEL_NAME,
            Key:{
                id
            }
        }
        var user = await dynamoClient.delete(params).promise()
        console.log(user)
        return user
    }

}
// scannTabel()
// addOrUpdateUser({id:"0",name:'abdallah shnaino'})
deleteUserById(0)
