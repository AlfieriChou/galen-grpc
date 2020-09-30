const grpc = require('grpc')

const book_service = require('./app/model/book_grpc_pb')
const Book = require('./app/service/book')

const server = new grpc.Server()

server.addService(book_service.BookServiceService, new Book())

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err) => {
  if (err) {
    throw err
  }
  console.log('Server running at http://0.0.0.0:50051')
  server.start()
})
