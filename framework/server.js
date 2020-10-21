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
        const descriptorNames = Object
          .keys(Object.getOwnPropertyDescriptors(service[`${modelName}`]))
          .filter(name => name !== 'constructor')
        const descriptors = descriptorNames.reduce((acc, descriptorName) => {
          const descriptor = service[`${modelName}`][descriptorName]
          if (!(typeof descriptor === 'function')) {
            throw new Error(`/app/service/${modelName} ${descriptorName} descriptor must be function`)
          }
          let func
          if (descriptor.constructor.name === 'AsyncFunction') {
            func = async (call, callback) => {
              try {
                const result = await service[`${modelName}`][descriptorName](call)
                callback(null, result)
              } catch (err) {
                callback(err, null)
              }
            }
          }
          if (descriptor.constructor.name === 'Function') {
            func = (call, callback) => {
              try {
                const result = service[`${modelName}`][descriptorName](call)
                callback(null, result)
              } catch (err) {
                callback(err, null)
              }
            }
          }
          return {
            ...acc,
            [descriptorName]: func
          }
        }, {})
        server.addService(handlers, descriptors)
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
