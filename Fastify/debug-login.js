import { db } from './src/database.js';
import { verify } from '@phc/argon2';

const [, , username, password] = process.argv;

if (!username || !password) {
    console.log('Usage: node debug-login.js <username> <password>');
    process.exit(1);
}

const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

if (user === undefined) {
    console.log(`Aucun utilisateur trouvé avec le username "${username}"`);
    console.log('Utilisateurs existants :', db.prepare('SELECT username FROM users').all());
    process.exit(0);
}

console.log('Utilisateur trouvé:', { id: user.id, username: user.username });
console.log('Hash stocké:', user.password);

const ok = await verify(user.password, password);
console.log(ok ? 'Mot de passe CORRECT ✅' : 'Mot de passe INCORRECT ❌');
