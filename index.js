var fs = require('fs')
var path = require('path')
var fmtjs = require('fmtjs')
var argv = require('yargs')
			.usage('Usage: $0 -i <input-js-file> -o <output-js-file>')
			.demand(['i', 'o'])
			.argv

var text = load_file(argv.i)
var opt = {}
var new_text = fmtjs(text, {})
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