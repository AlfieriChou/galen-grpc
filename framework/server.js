const grpc = require('grpc')
const path = require('path')

const classLoader = require('./lib/classLoader')
const { loadProtoFilePaths } = require('./common')

module.exports = async ({
  port = 50051,
  insecure = grpc.ServerCredentials.createInsecure(),
  protoDir = path.join(process.cwd(), '/app/proto'),
  serviceDir = path.join(process.cwd(), '/app/service')
}) => {
  const server = new grpc.Server()
  const service = classLoader(serviceDir)
  const protoFilePaths = loadProtoFilePaths(protoDir)
  await protoFilePaths.reduce(async (promise, filepath) => {
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

  server.bindAsync(`0.0.0.0:${port}`, insecure, (err) => {
    if (err) {
      throw err
    }
    console.log(`Server running at tcp://0.0.0.0:${port}`)
  })
  return server
}
