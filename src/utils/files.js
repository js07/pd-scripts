import glob from 'glob';
import fs from 'fs';

function getFiles(globPattern) {
  return glob.sync(globPattern);
}

function isProdAction(file) {
  return !file.includes('.dev.');
}

function isAction(file) {
  const fileContent = fs.readFileSync(file, 'utf-8');
  return /version: ["']/.test(fileContent);
}

function filterFile(file) {
  return isAction(file) && isProdAction(file);
}

function getActionName(file) {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const nameRegex = /name: ['"](.+)['"],\n/;
  const result = nameRegex.exec(fileContent);
  return result[1];
}

function getActionNames(files) {
  return files.map(getActionName);
}

export function getActions(globPattern) {
  const files = getFiles(globPattern);
  const relevantFiles = files.filter(filterFile);
  const actionNames = getActionNames(relevantFiles);
  return actionNames;
}

export function getActionsFromFiles(files) {
  const relevantFiles = files.filter(filterFile);
  const actionNames = getActionNames(relevantFiles);
  return actionNames;
}

// module.exports = {
//   getActions,
// };
