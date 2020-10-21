const grpc = require('grpc')
const initializeClient = require('./framework/client')

const metadata = new grpc.Metadata()
metadata.set('key', 'value')

const bootstrap = async () => {
  const { client, params } = await initializeClient()
  const { MessageRequest } = params.get('message')
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
