import { watch } from 'node:fs';
import { spawn } from 'node:child_process';

const filePath = process.argv[2];

if (!filePath) {
    console.error('Usage: node watcher.js <fichier>');
    process.exit(1);
}

function executer() {
    const child = spawn('node', [filePath]);
    child.stdout.on('data', (data) => process.stdout.write(data));
    child.stderr.on('data', (data) => process.stderr.write(data));
}

executer();

watch(filePath, () => {
    executer();
});
