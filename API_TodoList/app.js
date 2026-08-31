import { createServer } from "node:http";
import { index, create, remove, update } from "./Api/todos.js";
import { NotFoundError } from "./Fonction/errors.js";
import { createReadStream } from "node:fs";

createServer(async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        const url = new URL(req.url, `http://${req.headers.host}`);
        const endpoint = `${req.method} ${url.pathname}`;
        let result;
        switch (endpoint) {
            case 'GET /':
                res.setHeader('Content-Type', 'text/html; charset=utf-8');

                createReadStream('index.html').pipe(res);
                return;
                break;
            case 'GET /todos':
                result = await index(req, res);
                break;
            case 'POST /todos':
                result = await create(req, res);
                break;
            case 'DELETE /todos':
                result = await remove(req, res, url);
                break;
            case 'PUT /todos':
                result = await update(req, res, url);
                break;
            default:
                res.writeHead(404);
        }
        if (result) {
            res.write(JSON.stringify(result));
        }
        res.end();
    } catch (e) {
        if (e instanceof NotFoundError) {
            res.writeHead(404);
        } else {
            throw e;
        }
        res.end();
    }
}).listen(3000)