var http = require('http');
var fs = require('fs');

function onRequest (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function(err, data){
        if(err) {
            res.writeHead(404);
            res.write('File Not Found');
        }
        else {
            res.write(data);
        }
        res.end();
    });
}

http.createServer(onRequest).listen(8000);