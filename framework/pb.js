const path = require('path')

const { loadProtoFilePaths } = require('./common')

module.exports = async ({
  protoDir = path.join(process.cwd(), '/app/proto')
}) => {
  const pb = new Map()
  const protoFilePaths = loadProtoFilePaths(protoDir)
  await protoFilePaths.reduce(async (promise, filepath) => {
    await promise
    const modelName = path.basename(filepath).replace(/\.\w+$/, '')
    // eslint-disable-next-line import/no-dynamic-require, global-require
    pb.set(modelName, require(path.join(process.cwd(), `/app/model/${modelName}_pb`)))
  }, Promise.resolve())
  return pb
}
