#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var fmtjs = require('fmtjs')
var argv = require('yargs')
			.usage('Usage: $0 -i <input-js-file> -o <output-js-file>')
			.demand(['i', 'o'])
			.argv

var input_filename = path.resolve(argv.i)
var text = load_file(input_filename)
var opt = {
	// 如果输出文件是以 .html 结尾，则以 html 模式转换，否则以文本模式转换
	mode: /\.htm(l)?$/.test(argv.o) ? 'html' : 'text',
	filename: path.basename(input_filename)
}
var new_text = fmtjs(text, opt)
save_file(argv.o, new_text)
console.log('done. :)')

function load_file(filename) {
	try {
		filename = path.resolve(filename)
		console.log('load file: ' + filename)
		return fs.readFileSync(filename, 'utf8')
	}
	catch (err) {
		console.error(err.message)
		process.exit()
	}
}

function save_file(filename, content) {
	try {
		filename = path.resolve(filename)
		console.log('write file: ' + filename)
		fs.writeFileSync(filename, content, 'utf8')
	}
	catch (err) {
		console.error('save to file ' + JSON.stringify(filename) + ' failed: ' + err.message)
		process.exit()
	}
}
