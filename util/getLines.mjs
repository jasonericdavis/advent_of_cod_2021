import fs from 'fs'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function  getLines(solution, filename){
    const file = fs.readFileSync(path.join(__dirname,'../',solution, filename), 'utf8')
    return file.split('\n')
}

export { getLines }