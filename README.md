# galen-grpc

gRpc server template

## how to use

* client

```javascript
const grpc = require('grpc')

const { initializeClient, loadPb } = require('./framework')

const metadata = new grpc.Metadata()
metadata.set('key', 'value')

const bootstrap = async () => {
  const client = await initializeClient({})
  const pb = await loadPb({})
  const { MessageRequest } = pb.get('message')
  const request = new MessageRequest()
  request.setMessageId('dis')
  request.setMessageType('what')

  client.get('message').addMessage(request, metadata, (err, res) => {
    if (err) {
      throw err
    }
    console.log('-->', res.toObject())
  })
}

bootstrap()
```

* server

```javascript
const { initializeServer } = require('./framework')

const run = async () => {
  const server = await initializeServer({})
  server.start()
}

run()
```

## 存在的问题

* [ ] protoc优雅工具
* [ ] 未支持自定义端口
* [ ] 未支持grpc个性化协议
