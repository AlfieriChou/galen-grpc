const grpc = require('grpc')
const path = require('path')
const readDirFilenames = require('read-dir-filenames')

const classLoader = require('./lib/classLoader')

const { PORT = 50051 } = process.env

const server = new grpc.Server()

module.exports = async () => {
  const service = classLoader(path.join(process.cwd(), '/app/service'))
  const protoFilepaths = readDirFilenames(path.join(process.cwd(), '/app/proto'))

  await protoFilepaths.reduce(async (promise, filepath) => {
    await promise
    const modelName = path.basename(filepath).replace(/\.\w+$/, '')
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(process.cwd(), `/app/model/${modelName}_grpc_pb`))
    Object.entries(model).forEach(([handlersName, handlers]) => {
      if (handlersName.endsWith('Service')) {
        const classesFuncNames = Object.keys(
          Object.getOwnPropertyDescriptors(service[`${modelName}`])
        ).filter(name => name !== 'constructor')
        const prototypeFuncs = classesFuncNames.reduce((acc, funcName) => ({
          ...acc,
          [funcName]: (call, callback) => {
            try {
              // TODO: support async function
              const result = service[`${modelName}`][funcName](call)
              callback(null, result)
            } catch (err) {
              callback(err, null)
            }
          }
        }), {})
        server.addService(handlers, prototypeFuncs)
      }
    })
  }, Promise.resolve())

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err) => {
    if (err) {
      throw err
    }
    console.log(`Server running at tcp://0.0.0.0:${PORT}`)
  })
  return server
}
