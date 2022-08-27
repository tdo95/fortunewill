const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const requestUrl = url.parse(req.url);
    const page = requestUrl.pathname;
    const params = querystring.parse(requestUrl.query);
    const routes = {
        '/': {
          file: 'index.html', 
          contentType: 'text/html'
        }, 
        '/css/style.css':{
          file: 'css/style.css',
          contentType: 'text/css'
        },
        '/css/normalize.css':{
          file: 'css/style.css',
          contentType: 'text/css'
        },
        '/js/main.js': {
          file: 'js/main.js',
          contentType: 'text/javascript'
        }
    };
   
    if (routes[page]) {
        fs.readFile(routes[page].file, 
        function(err, data) {
            res.writeHead(200, {'Content-Type': routes[page].contentType});
            res.write(data);
            res.end();
        });
    }

})

server.listen(8000);