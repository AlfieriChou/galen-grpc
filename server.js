const initializeServer = require('./framework/server')

const run = async () => {
  const server = await initializeServer()
  server.start()
}

run()
