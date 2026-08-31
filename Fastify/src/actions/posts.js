import { db } from '../database.js';
import { RecordNotFoundError } from '../error/RecordNotFoundError.js';
import { verifyUser } from '../fonctions/auth.js';


export const listPosts = (req, res) => {
    const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
    res.view('templates/index.ejs', {
        posts,
        user : req.session.get('user')

    })

}

export const showPost = (req, res) => {
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    if (post === undefined) {
        throw new RecordNotFoundError(`Impossible de trouver l'article avec l'ID ${req.params.id}`);
    }
   return  res.view('templates/shared/single.ejs', {
        post,
        user: req.session.get('user') // Ajouté avec Claude
    })
}

export const createPost = (req, res) => {
    verifyUser(req)
    if (!req.body.title || !req.body.content) {
        return res.redirect('/');
    }
    db.prepare('INSERT INTO posts (title,content,created_at) VALUES (?,?,?)')
      .run(
        req.body.title,
        req.body.content,
        Math.round(Date.now() / 1000)
      )
    return res.redirect('/')
}