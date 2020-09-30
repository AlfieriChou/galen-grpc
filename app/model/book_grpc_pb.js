// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_book_pb = require('./book_pb.js');

function serialize_books_BookList(arg) {
  if (!(arg instanceof proto_book_pb.BookList)) {
    throw new Error('Expected argument of type books.BookList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_books_BookList(buffer_arg) {
  return proto_book_pb.BookList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_books_Empty(arg) {
  if (!(arg instanceof proto_book_pb.Empty)) {
    throw new Error('Expected argument of type books.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_books_Empty(buffer_arg) {
  return proto_book_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var BookServiceService = exports.BookServiceService = {
  list: {
    path: '/books.BookService/List',
    requestStream: false,
    responseStream: false,
    requestType: proto_book_pb.Empty,
    responseType: proto_book_pb.BookList,
    requestSerialize: serialize_books_Empty,
    requestDeserialize: deserialize_books_Empty,
    responseSerialize: serialize_books_BookList,
    responseDeserialize: deserialize_books_BookList,
  },
};

exports.BookServiceClient = grpc.makeGenericClientConstructor(BookServiceService);
