
const books = [
  { id: 123, title: 'A Tale of Two Cities', author: 'Charles Dickens' }
]

module.exports = class Book {
  async list (call, callback) {
    callback(null, books)
  }
}
