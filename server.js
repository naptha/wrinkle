var multiparty = require('multiparty'), 
	http = require('http'),
	util = require('util'),
	tess = require('./tess')

http.createServer(function(req, res) {

	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Max-Age', '604800');
	// is this a security problem?
	if(req.headers['access-control-request-headers']){
		res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'])	
	}
		
	if (req.url === '/ocr' && req.method === 'POST') {
		var form = new multiparty.Form();
		form.parse(req, function(err, fields, files) {
			console.log(files, fields)
			if(files && files.image && files.image[0]){
				var engine = (fields.engine || 'tess:eng').toString().split(':');
				if(engine[0] == 'tess'){
					tess.process(files.image[0].path, engine[1], function(err, text){
						if(err){
							res.writeHead(500, {'content-type': 'text/plain'});
							if(typeof err == 'string'){
								res.end(err)
							}else{
								res.end(util.inspect(err))	
							}
						}else{
							res.writeHead(200, {'content-type': 'text/plain'});
							res.end(text)
						}
					})	
				}else{
					res.writeHead(500, {'content-type': 'text/plain'});
					res.end('no file was sent')
				}
				
			}else{
				res.writeHead(500, {'content-type': 'text/plain'});
				res.end(engine[0] + ' not implemented backend')
			}
			
		});
		return;
	}
	// show a file upload form
	res.writeHead(200, {'content-type': 'text/html'});
	res.end(
		"<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,600' rel='stylesheet' type='text/css'>" +
		'<style>*{font-family: \'Source Sans Pro\', sans-serif;margin: 0;font-weight: 200; text-align: center}</style>' +
		'<h1 style="margin-top: 100px">welcome to your new pony</h1>'+
		'<p>this is the backend ocr runtime for project <font color=orange>naptha</font></p>'+
		"<div style=' position: absolute; bottom: 100px; width: 100%'><p style='font-size: small;'>i kno dis aint supah-citin but dat dunt ma'er</p></div>"
	);
}).listen(3762);

process.on('uncaughtException', function(err) {
	console.error(err.stack);
})