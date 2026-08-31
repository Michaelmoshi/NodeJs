/*import { readFile , writeFile } from 'fs/promises';

const content = await readFile('video.mp4');
await writeFile('video_copy.mp4', content);*/

import {createReadStream} from 'node:fs'
import {stat} from 'node:fs/promises'
import {createWriteStream} from 'node:fs'
/*const stream = createReadStream('video.mp4')

const {size} = await stat('video.mp4')
let read = 0 

stream.on('data',(chunk) => {
    read += chunk.length
    console.log(Math.round((read/size)*100))

    //console.log(chunk.length)

})

stream.on('close', () =>{
    console.log ('close')
})*/

const stream = createReadStream('video.mp4')
const writeStream = createWriteStream('video_copy.mp4')
stream.pipe(writeStream)