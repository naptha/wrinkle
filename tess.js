var exec = require('child_process').exec
var fs = require('fs')
var tmp = require('tmp')


exports.process = function(path, lang, callback){
	tmp.tmpName({ postfix: '.tif' }, function(err, tif){
		exec(['convert', '-type', 'Grayscale', path, tif].join(' '), function(err, stdout, stderr){
			fs.unlink(path, function(){})
			if(stderr) return callback(stderr);
			tmp.tmpName({ postfix: '.txt' }, function(err, charname){
				if(err) return callback(err);
				exec([__dirname + '/tessrec', lang, tif, charname].join(' '), function(err, stdout, stderr){
					fs.readFile(charname, function(err, chardata){
						fs.unlink(tif, function(){})
						fs.unlink(charname, function(){})
						if(err) return callback(stderr || err);
						callback(null, chardata.toString('UTF-8'))
					})
				})
			})
		})
	})
}