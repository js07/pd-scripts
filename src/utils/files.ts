import * as glob from 'glob';
import * as fs from 'fs';
import gulp from 'gulp';
import replace from 'gulp-replace';
import { get, set } from './datastore';

type Globs = string | string[];

function getFiles(globPattern: string) {
  return glob.sync(globPattern);
}
function isProdAction(file: string) {
  return !file.includes('.dev.');
}
function isAction(file: string) {
  const fileContent = fs.readFileSync(file, 'utf-8');
  return /version: ["']/.test(fileContent);
}
function filterFile(file: string) {
  return isAction(file) && isProdAction(file);
}
function getActionName(file: string) {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const nameRegex = /name: ['"](.+)['"],\n/;
  const result = nameRegex.exec(fileContent);
  return result?.[1];
}
function getActionNames(files: string[]) {
  return files
    .map(getActionName)
    .filter((actionName): actionName is string => Boolean(actionName));
}
export function getActions(globPattern: string) {
  const files = getFiles(globPattern);
  const relevantFiles = files.filter(filterFile);
  const actionNames = getActionNames(relevantFiles);
  return actionNames;
}
export function getActionsFromFiles(files: string[]) {
  const relevantFiles = files.filter(filterFile);
  const actionNames = getActionNames(relevantFiles);
  return actionNames;
}

function changeVersion(
  globs: Globs,
  version: string | ((oldVersion: string) => string)
) {
  return gulp
    .src(globs, {
      base: './',
    })
    .pipe(
      replace(/version:\s?['"](\d+.\d+.\d+)['"]/g, (_match, capture) => {
        if (typeof version === 'string') {
          return `version: "${version}"`;
        }
        return version(capture);
      })
    )
    .pipe(gulp.dest('./'));
}
export function setVersion(globs: Globs, version: string) {
  return changeVersion(globs, version);
}
export function resetVersion(globs: Globs) {
  return setVersion(globs, '0.0.1');
}
export function bumpVersion(globs: Globs) {
  return changeVersion(globs, oldVersion => {
    const versionParts = oldVersion.split('.');
    const newVersion = `${versionParts[0] ?? 0}.${versionParts[1] ?? 0}.${
      (versionParts[2] && parseInt(versionParts[2], 10) + 1) ?? 0
    }`;
    return `version: "${newVersion}"`;
  });
}
export function setDevVersion(globs: Globs) {
  const version = `0.0.${Math.floor(Date.now() / 1000)}`;
  return setVersion(globs, version);
}
