const { MessageResponse } = require('../model/message_pb')

const books = [
  { id: 123, title: 'A Tale of Two Cities', author: 'Charles Dickens' }
]

module.exports = class Message {
  async addMessage (call, callback) {
    const res = new MessageResponse()
    console.log('[gRPC]: ', call.request.toObject())
    console.info('message: ' + JSON.stringify(call.request.toObject()))
    if (!call.request.toObject()) {
      return callback(new Error('找不到数据'), null)
    }
    const data = call.request.toObject()
    res.setMessageId(data.messageId)
    res.setMessageType(data.messageType)
    callback(null, res)
  }
}
