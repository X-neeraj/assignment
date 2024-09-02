const http = require('http');
const {fetchLatest} = require('./fetch');
const server = http.createServer(async(req, res) => {
    if(req.method==='GET'&&req.url==='/getTimeStories'){
        try {
            const data = await fetchLatest();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
          } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          }
    }else{
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Go to /getTimeStories to see the results');
    }
});

server.listen(3000, () => {
    console.log(`Server is running`);
});