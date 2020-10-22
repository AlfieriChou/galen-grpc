module.exports = class Message {
  async addMessage (ctx) {
    const { MessageResponse } = ctx.pb.get('message')
    const res = new MessageResponse()
    const data = ctx.request.toObject()
    console.log('[gRPC]: ', data)
    console.info(`message: ${JSON.stringify(data)}`)
    if (!ctx.request.toObject()) {
      throw new Error('找不到数据')
    }
    res.setMessageId(data.messageId)
    res.setMessageType(data.messageType)
    return res
  }
}
