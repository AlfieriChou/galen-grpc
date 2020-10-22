const grpc = require('grpc')
const path = require('path')

const { loadProtoFilePaths } = require('./common')

module.exports = async ({
  host = 'localhost',
  port = 50051,
  insecure = grpc.credentials.createInsecure(),
  protoDir = path.join(process.cwd(), '/app/proto')
}) => {
  const client = new Map()
  const protoFilPaths = loadProtoFilePaths(protoDir)
  await protoFilPaths.reduce(async (promise, filepath) => {
    await promise
    const modelName = path.basename(filepath).replace(/\.\w+$/, '')
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(process.cwd(), `/app/model/${modelName}_grpc_pb`))
    Object.entries(model).forEach(([handlersName, Client]) => {
      if (handlersName.endsWith('Client')) {
        client.set(modelName, new Client(`${host}:${port}`, insecure))
      }
    })
  }, Promise.resolve())
  return client
}
