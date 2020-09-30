const grpc = require('grpc')

const book_service = require('./model/book_grpc_pb')

const books = [
  { id: 123, title: 'A Tale of Two Cities', author: 'Charles Dickens' }
]

const server = new grpc.Server()

class Book {
  static async list (call, callback) {
    callback(null, books)
  }
}

server.addService(book_service.BookServiceService, new Book())

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err) => {
  if (err) {
    throw err
  }
  console.log('Server running at http://0.0.0.0:50051')
  server.start()
})
