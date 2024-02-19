// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments');

// Create web server
var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    pathname += 'index.html';
  }
  var filePath = path.join(__dirname, pathname);
  fs.readFile(filePath, 'binary', function(err, fileContent) {
    if (err) {
      console.log('404' + req.url);
      res.writeHead(404, 'Not Found');
      res.end('<h1>404 Not Found</h1>');
    } else {
      console.log('200' + req.url);
      res.writeHead(200, 'OK');
      res.write(fileContent, 'binary');
      res.end();
    }
  });
});

// Listen on port 8080
server.listen(8080);
console.log('Server is running at http://'); // Fix: Added the missing closing quotation mark
