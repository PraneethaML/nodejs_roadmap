import path from 'node:path';
import fs from 'node:fs';

let folder;
if (process.argv.length > 2) {
  console.log("Arguments were passed!");
  
  const userArgs = process.argv.slice(2); 
  console.log("User arguments:", userArgs);
  folder = userArgs[0];
} else {
  console.log("No command-line arguments were provided.");
  folder = process.cwd();
}

if (!fs.existsSync(folder)) {
  console.error("The specified folder does not exist:", folder);
  process.exit(1);
}

console.log("Folder:", path.basename(folder));

let folder_path = path.resolve(folder);
console.log("Path:", folder);
let folder_contents = fs.readdirSync(folder_path);

let files = folder_contents.filter(item => fs.statSync(path.join(folder_path, item)).isFile());
console.log("Files:", files);
let folders = folder_contents.filter(item => fs.statSync(path.join(folder_path, item)).isDirectory());
console.log("Folders:", folders);

