import {writeFile} from 'node:fs/promises';

await writeFile('demo3.txt', 'Hello, World!', 'utf8');
