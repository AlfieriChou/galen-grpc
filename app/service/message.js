const { MessageResponse } = require('../model/message_pb')

module.exports = class Message {
  addMessage (ctx) {
    const res = new MessageResponse()
    console.log('[gRPC]: ', ctx.request.toObject())
    console.info(`message: ${JSON.stringify(ctx.request.toObject())}`)
    if (!ctx.request.toObject()) {
      throw new Error('找不到数据')
    }
    const data = ctx.request.toObject()
    res.setMessageId(data.messageId)
    res.setMessageType(data.messageType)
    return res
  }
}
