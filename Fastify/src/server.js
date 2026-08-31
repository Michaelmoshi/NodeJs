import fastify from "fastify";
import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";
import fastifyFrombody from "@fastify/formbody"
import fastifySecureSession from  '@fastify/secure-session'
import path, { dirname , join } from "node:path";
import { fileURLToPath } from "node:url";
import ejs from "ejs";
import { createPost, listPosts } from "./actions/posts.js";
import { showPost } from "./actions/posts.js";
import { RecordNotFoundError } from "./error/RecordNotFoundError.js";
import { loginAction, logoutAction } from "./actions/auth.js";
import { readFileSync } from "node:fs";
import { NotAuthentificatedError } from "./error/NotAuthentificatedError.js";



const app = fastify();
const rootDir = dirname(fileURLToPath(import.meta.url));

app.register(fastifyView, {

    engine: {
        ejs: ejs
    }
})

app.register(fastifySecureSession,{
  // the name of the attribute decorated on the request-object, defaults to 'session'
  sessionName: 'session',
  // the name of the session cookie, defaults to value of sessionName
  cookieName: 'my-session-cookie',
  // adapt this to point to the directory where secret-key is located
  key:readFileSync(join(rootDir, '..', 'secret-key')),
  // the amount of time the session is considered valid; this is different from the cookie options
  // and based on value within the session.
  expiry: 24 * 60 * 60, // Default 1 day
  cookie: {
    path: '/'
    // options for setCookie, see https://github.com/fastify/fastify-cookie
  }
})

app.register(fastifyFrombody)

app.register( fastifyStatic, {
    root: path.join(rootDir, '..', 'public'),

})


app.get('/login',loginAction);
app.post('/login',loginAction);

app.post('/logout',logoutAction);

app.get('/', listPosts);

app.post('/',createPost);

app.get('/article/:id', showPost);

app.setErrorHandler((error, req, res) => {
    if (error instanceof RecordNotFoundError) {
        res.statusCode = 404;
        return res.view('templates/shared/404.ejs', { error :'Cette enrigistrement n\'existe pas' });
    }else if (error instanceof NotAuthentificatedError ) {
        return res.redirect('/login')
    }
    
    
    else {
        res.statusCode = 500;
        console.error(error);
        return{
            error:error.message
        }
    }
});

const start = async () => {
    try {
        await app.listen({ port: 3000 });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
start();