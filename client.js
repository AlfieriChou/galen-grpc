const grpc = require('grpc')

const { initializeClient, loadPb } = require('./framework')

const metadata = new grpc.Metadata()
metadata.set('key', 'value')

const bootstrap = async () => {
  const client = await initializeClient({})
  const pb = await loadPb({})
  const { MessageRequest } = pb.get('message')
  const request = new MessageRequest()
  request.setMessageId('dis')
  request.setMessageType('what')

  client.get('message').addMessage(request, metadata, (err, res) => {
    if (err) {
      throw err
    }
    console.log('-->', res.toObject())
  })
}

bootstrap()
