const readDirFilenames = require('read-dir-filenames')

exports.loadProtoFilePaths = protoDir => readDirFilenames(protoDir)
