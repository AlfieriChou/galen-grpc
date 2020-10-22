const { initializeServer } = require('./framework')

const run = async () => {
  const server = await initializeServer({})
  server.start()
}

run()
