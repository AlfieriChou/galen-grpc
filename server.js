const grpc = require('grpc')
const path = require('path')
const readDirFilenames = require('read-dir-filenames')

const classLoader = require('./app/lib/classLoader')

const { PORT = 50051 } = process.env

const server = new grpc.Server()

const run = async () => {
  const service = classLoader(path.join(__dirname, '/app/service'))
  const protoFilepaths = readDirFilenames(path.join(__dirname, '/app/proto'))

  await protoFilepaths.reduce(async (promise, filepath) => {
    await promise
    const modelName = path.basename(filepath).replace(/\.\w+$/, '')
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, `/app/model/${modelName}_grpc_pb`))
    Object.entries(model).forEach(([handlersName, handlers]) => {
      if (handlersName.endsWith('Service')) {
        server.addService(handlers, service[`${modelName}`])
      }
    })
  }, Promise.resolve())

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err) => {
    if (err) {
      throw err
    }
    console.log(`Server running at tcp://0.0.0.0:${PORT}`)
    server.start()
  })
}

run()
