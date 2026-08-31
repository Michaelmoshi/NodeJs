import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

// méthode synchrone
const content = fs.readFileSync('demo.txt', 'utf8');
console.log(content);

// méthode asynchrone avec callback
fs.readFile('demo.txt', 'utf8', (err, content2) => {
  if (err) {
    console.error('Erreur lecture async :', err);
    return;
  }
  console.log(content2);
});

// Avec les promises (recommandé)
const content3 = await fsPromises.readFile('demo2.txt', 'utf8');
console.log(content3);
// console.log('Hello, World!');