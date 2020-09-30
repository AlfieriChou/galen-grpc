const grpc = require('grpc')

const message = require('./app/model/message_grpc_pb')
const Message = require('./app/service/message')

const server = new grpc.Server()

server.addService(message.MessageServiceService, new Message())

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err) => {
  if (err) {
    throw err
  }
  console.log('Server running at http://0.0.0.0:50051')
  server.start()
})
