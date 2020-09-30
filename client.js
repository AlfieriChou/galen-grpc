const grpc = require('grpc')

const message = require('./app/model/message_grpc_pb')
const { MessageRequest } = require('./app/model/message_pb')

const client = new message.MessageServiceClient('localhost:50051',  grpc.credentials.createInsecure())

const metadata = new grpc.Metadata()
metadata.set('key', 'value')

const params = new MessageRequest()
  params.setMessageId('dis')
  params.setMessageType('what')

client.addMessage(params, metadata, (err, res) => {
  if (err) {
    throw err
  }
  console.log('-->', res.toObject())
})
