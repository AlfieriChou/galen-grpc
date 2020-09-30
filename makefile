################################################################################################
TS_OUT_DIR := ./model
PROTO_DIR := ./proto/*.proto

generateModel:
	@docker run --rm -v $(pwd):$(pwd) -w $(pwd) -e TS_OUT_DIR=./ alfierichou/proto:latest sh -c  'protoc -I ./ --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" --js_out="import_style=commonjs,binary:./app/model" --ts_out="service=true:./app/model" ./proto/*.proto && grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./app/model --grpc_out=./app/model --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` -I ./ ./proto/*.proto'