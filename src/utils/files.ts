import * as glob from 'glob'
import * as fs from 'fs'

function getFiles(globPattern: string) {
  return glob.sync(globPattern)
}

function isProdAction(file: string) {
  return !file.includes('.dev.')
}

function isAction(file: string) {
  const fileContent = fs.readFileSync(file, 'utf-8')
  return /version: ["']/.test(fileContent)
}

function filterFile(file: string) {
  return isAction(file) && isProdAction(file)
}

function getActionName(file: string) {
  const fileContent = fs.readFileSync(file, 'utf-8')
  const nameRegex = /name: ['"](.+)['"],\n/
  const result = nameRegex.exec(fileContent)
  return result?.[1]
}

function getActionNames(files: string[]) {
  return files.map(getActionName).filter((actionName): actionName is string => Boolean(actionName))
}

export function getActions(globPattern: string) {
  const files = getFiles(globPattern)
  const relevantFiles = files.filter(filterFile)
  const actionNames = getActionNames(relevantFiles)
  return actionNames
}

export function getActionsFromFiles(files: string[]) {
  const relevantFiles = files.filter(filterFile)
  const actionNames = getActionNames(relevantFiles)
  return actionNames
}

// module.exports = {
//   getActions,
// };
