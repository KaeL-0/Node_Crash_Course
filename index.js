import http from 'http';
import path from 'path';
import {promises as fs} from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer( async (req, res) => {
    // try{

    //     if(req.url === '/'){
    //         let content = await fs.readFile(path.join(__dirname, 'public', 'index.html'));  
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);     
    //     }

    //     if(req.url === '/about'){
    //         let content = await fs.readFile(path.join(__dirname, 'public', 'about.html')); 
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);    
    //     }

    //     if(req.url === '/api/users') {
    //         let users = [
    //             { name: 'Mikhael Gomez', age: 19},
    //             { name: 'Rhaulline Balhag', age: 19}
    //         ];
    //         res.writeHead(200, {'Content-Type': 'application/json'});
    //         res.write('MY API:\n\n');
    //         res.end(JSON.stringify(users));
    //     }

    // } catch(err){
    //     throw err;
    // }

    //Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html': req.url);

    //Extension of file
    let extname = path.extname(filePath);

    //Initial content type
    let contentType = 'text/html';

    //Check ext and set content type
    switch (extname) {
        case ".js":
          contentType = "text/javascript";
          break;
        case ".css":
          contentType = "text/css";
          break;
        case ".json":
          contentType = "application/json";
          break;
        case ".png":
          contentType = "image/png";
          break;
        case ".jpg":
          contentType = "image/jpg";
          break;
      }

    try{
      //Read file
      let content = await fs.readFile(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
      
    } catch(err){
        if(err.code == 'ENOENT') {
            // Page not found
            let content = await fs.readFile(path.join(__dirname, 'public', '404.html'));
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
        } else {
            //Some server error
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        }
    }

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));