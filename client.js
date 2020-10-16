const grpc = require('grpc')
const path = require('path')
const readDirFilenames = require('read-dir-filenames')

const { PORT = 50051 } = process.env

const client = new Map()
const params = new Map()
const protoFilepaths = readDirFilenames(path.join(__dirname, '/app/proto'))

protoFilepaths.forEach((filepath) => {
  const modelName = path.basename(filepath).replace(/\.\w+$/, '')
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const model = require(path.join(__dirname, `/app/model/${modelName}_grpc_pb`))
  Object.entries(model).forEach(([handlersName, Client]) => {
    if (handlersName.endsWith('Client')) {
      client.set(modelName, new Client(`localhost:${PORT}`, grpc.credentials.createInsecure()))
    }
  })
  // eslint-disable-next-line import/no-dynamic-require, global-require
  params.set(modelName, require(path.join(__dirname, `/app/model/${modelName}_pb`)))
})

const metadata = new grpc.Metadata()
metadata.set('key', 'value')

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
