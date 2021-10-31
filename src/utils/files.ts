import * as glob from 'glob';
import * as fs from 'fs';
import gulp from 'gulp';
import replace from 'gulp-replace';
import { get, set } from './datastore';
import { warn } from './logger';
import { Stream } from 'stream';

// const ACTION_VERSIONS_KEY = Symbol('ACTION_VERSIONS_KEY');
export const ACTION_VERSIONS_KEY = 'ACTION_VERSIONS_KEY';

export type Globs = string | string[];
interface Action {
  key: string;
  name: string;
  version: string;
  type?: string;
  description?: string;
  filePath?: string;
}

interface ActionWithFile extends Action {
  filePath: string;
}

interface ActionVersions {
  [key: string]: string;
}

function promisifyStream(stream: Stream) {
  return new Promise(res => stream.on('end', res));
}

function propRegex(propName: string) {
  return new RegExp(`${propName}: ['"](.+)['"]`);
}
function keyRegex() {
  // return /key: ['"](.+)['"],\n/;
  return propRegex('key');
}
function nameRegex() {
  // return /name: ['"](.+)['"],\n/;
  return propRegex('name');
}
function versionRegex() {
  // return /version:\s?['"](\d+.\d+.\d+)['"]/;
  return propRegex('version');
}
function typeRegex() {
  return propRegex('type');
  // return /key: ['"](.+)['"],\n/;
}
export function getFilePaths(globs: Globs) {
  if (Array.isArray(globs)) {
    return globs;
  }
  return glob.sync(globs);
}
function getFiles(globPattern: string) {
  return glob.sync(globPattern);
}
function isProdActionFile(file: string) {
  return !file.includes('.dev.');
}
function isActionFile(file: string) {
  const fileContent = fs.readFileSync(file, 'utf-8');
  return /version: ["']/.test(fileContent);
}
function filterFile(file: string) {
  return isActionFile(file) && isProdActionFile(file);
}
function isAction(action: Partial<Action>): action is Action {
  return Boolean(action.key) && Boolean(action.name) && Boolean(action.version);
}
export function getActionProps(file: string): Action | null {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const props = {
    key: keyRegex().exec(fileContent)?.[1],
    name: nameRegex().exec(fileContent)?.[1],
    version: versionRegex().exec(fileContent)?.[1],
    type: typeRegex().exec(fileContent)?.[1],
    description: typeRegex().exec(fileContent)?.[1],
  };
  return isAction(props) ? props : null;
}
export function getActionsProps(files: string[]) {
  return files
    .map(getActionProps)
    .filter((a): a is Action => Boolean(a));
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
  version: string | ((oldVersion: string) => string),
) {
  const stream = gulp
    .src(globs, {
      base: './',
    })
    .pipe(
      replace(versionRegex(), (_match, capture) => {
        if (typeof version === 'string') {
          return `version: "${version}"`;
        }
        return version(capture);
      })
    )
    .pipe(gulp.dest('./'));
  return promisifyStream(stream);
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

function getActionVersionStoreKey(actionKey: string): string {
  return `${ACTION_VERSIONS_KEY}.${actionKey}`;
}

// export function getStoredVersions(files: string[]) {
//   const actions = files.map((f): Partial<Action> => ({ ...getActionProps(f), filePath: f }));
//   const notFoundActions = actions.filter(f => !f.key);
//   if (notFoundActions.length > 0) {
//     warn(`Actions not found for files: ${notFoundActions.join(', ')}`);
//   }
//   actions
//     .filter((a): a is ActionWithFile => a !== null)
//     .forEach(restoreActionVersion);
// }
export function getFileActions(files: string[]) {
  const actions = files.map((f): Partial<Action> => ({ ...getActionProps(f), filePath: f }));
  const notFoundActions = actions.filter(f => !f.key);
  if (notFoundActions.length > 0) {
    warn(`Actions not found for files: ${notFoundActions.join(', ')}`);
  }
  const foundActions = actions.filter((a): a is ActionWithFile => a !== null);
  return foundActions;
}

function restoreActionVersion(action: ActionWithFile) {
  const storeKey = getActionVersionStoreKey(action.key);
  const version = get(storeKey);
  return setVersion(action.filePath, version);
}

// export function storeVersions(files: string[]) {
export function storeVersions(globs: Globs) {
  const files = typeof globs === 'string' ? getFiles(globs) : globs;
  const actions = getActionsProps(files);
  const actionVersions = actions.reduce((acc: ActionVersions, action) => {
    acc[getActionVersionStoreKey(action.key)] = action.version;
    return acc;
  }, {});
  return set(actionVersions);
}

export function restoreVersions(globs: Globs) {
  const files = typeof globs === 'string' ? getFiles(globs) : globs;
  const actions = getFileActions(files);
  return Promise.all(actions.map(restoreActionVersion));
}

// export function getStoredVersions(files: string[]) {
//   const actions = files.map((f): Partial<Action> => ({ ...getActionProps(f), filePath: f }));
//   const notFoundActions = actions.filter(f => !f.key);
//   if (notFoundActions.length > 0) {
//     warn(`Actions not found for files: ${notFoundActions.join(', ')}`);
//   }
//   return actions
//     .filter((a): a is ActionWithFile => a !== null)
//   // actions
//   //   .filter((a): a is ActionWithFile => a !== null)
//   //   .forEach(restoreActionVersion);
// }
