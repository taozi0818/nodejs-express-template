let exec = require('child_process').execSync;
let result = exec(`git status --porcelain --untracked-files=no | awk '{print $2}' | grep -E ".js$"`);
let filesArr = result.toString().trim().split('\n');
let modelChange = filesArr.some(fileName => {
  return fileName.startsWith('api/models/');
});

let migrationChange = filesArr.some(fileName => {
  return fileName.startsWith('db/migrations/');
});

if (modelChange && !migrationChange) {
  throw new Error('There are some migrations you have forgotten!');
}
