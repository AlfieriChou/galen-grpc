// package: books
// file: proto/book.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as proto_book_pb from "./book_pb";

interface IBookServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    list: IBookServiceService_IList;
}

interface IBookServiceService_IList extends grpc.MethodDefinition<proto_book_pb.Empty, proto_book_pb.BookList> {
    path: string; // "/books.BookService/List"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<proto_book_pb.Empty>;
    requestDeserialize: grpc.deserialize<proto_book_pb.Empty>;
    responseSerialize: grpc.serialize<proto_book_pb.BookList>;
    responseDeserialize: grpc.deserialize<proto_book_pb.BookList>;
}

export const BookServiceService: IBookServiceService;

export interface IBookServiceServer {
    list: grpc.handleUnaryCall<proto_book_pb.Empty, proto_book_pb.BookList>;
}

export interface IBookServiceClient {
    list(request: proto_book_pb.Empty, callback: (error: grpc.ServiceError | null, response: proto_book_pb.BookList) => void): grpc.ClientUnaryCall;
    list(request: proto_book_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_book_pb.BookList) => void): grpc.ClientUnaryCall;
    list(request: proto_book_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_book_pb.BookList) => void): grpc.ClientUnaryCall;
}

export class BookServiceClient extends grpc.Client implements IBookServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public list(request: proto_book_pb.Empty, callback: (error: grpc.ServiceError | null, response: proto_book_pb.BookList) => void): grpc.ClientUnaryCall;
    public list(request: proto_book_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_book_pb.BookList) => void): grpc.ClientUnaryCall;
    public list(request: proto_book_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_book_pb.BookList) => void): grpc.ClientUnaryCall;
}
