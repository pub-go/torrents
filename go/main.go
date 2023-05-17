// GOOS=js GOARCH=wasm go build -o ../src/assets/main.wasm main.go
// cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" ../src/assets
package main

import (
	"crypto/sha1"
	"syscall/js"
)

// hash 导出到 js 中的类型是 (input: Uint8Array, result: Uint8Array) => Uint8Array
func hash(this js.Value, args []js.Value) any {
	var data = make([]byte, args[0].Length())
	js.CopyBytesToGo(data, args[0])
	var sum = sha1.Sum(data)
	js.CopyBytesToJS(args[1], sum[:])
	return args[1]
}

func main() {
	keep := make(chan int, 0)
	js.Global().Set("go_sha1", js.FuncOf(hash))
	<-keep
}
