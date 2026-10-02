import path from 'node:path';
import fs from 'node:fs';

function getFolderFromArgs() {
  const folder = process.argv[2] || process.cwd();

  if (!process.argv[2]) {
    console.log('No command-line argument provided. Using current directory.');
  }

  return path.resolve(folder);
}

function readFolder(folderPath) {
  try {
    const entries = fs.readdirSync(folderPath, { withFileTypes: true });

    const files = entries
      .filter(entry => entry.isFile())
      .map(entry => entry.name);

    const folders = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);

    return { files, folders };
  } catch (error) {
    console.error(`Unable to read folder: ${folderPath}`);
    console.error(error.message);
    process.exit(1);
  }
}

const folderPath = getFolderFromArgs();

if (!fs.existsSync(folderPath)) {
  console.error(`Folder does not exist: ${folderPath}`);
  process.exit(1);
}

const { files, folders } = readFolder(folderPath);

console.log('Folder:', path.basename(folderPath));
console.log('Path:', folderPath);
console.log('Files:', files);
console.log('Folders:', folders);