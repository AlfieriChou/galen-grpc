const grpc = require('grpc')

const book_service = require('./model/book_grpc_pb')
const book = require('./model/book_pb')

const client = new book_service.BookServiceClient('http://localhost:50051',  grpc.credentials.createInsecure())

const empty = new book.Empty()

const metadata = new grpc.Metadata()
metadata.set('key', 'value')

client.list(empty, metadata, (err, res) => {
  if (err) {
    throw err
  }
  console.log('-->', res)
})
