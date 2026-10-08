import path from 'node:path';
import fs from 'node:fs';

function readFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        process.exit(1);
    }

  }

function getFileFromArgs() {
   const filePath = process.argv[2]
  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}. Please provide a file path`);
    process.exit(1);
  }
  return filePath;
}

function getWordCharacterLineCount(filepath) {
    const fileContent = readFile(filepath);
    const lines = fileContent.split('\n');
    const words = fileContent.split(/\s+/).filter(Boolean);
    const characters = fileContent.length;

    return { words: words.length, characters, lines: lines.length };
}

const filePath = getFileFromArgs();
const fileContent = readFile(filePath);
const wordCharcount = getWordCharacterLineCount(filePath);

console.log('File:', path.basename(filePath));
// console.log('Path:', filePath);
//console.log('Content:', fileContent);
console.log('lines:', wordCharcount.lines);
console.log('words:', wordCharcount.words);
console.log('characters:', wordCharcount.characters);
