import * as Actions from 'fs';
import { get, set } from '../utils/datastore';
import { getFilePaths, getFiles, Globs } from '../utils/file';
import { warn } from '../utils/logger';
import { keyRegex, nameRegex, versionRegex, typeRegex, setVersion } from './components';

export const ACTION_VERSIONS_KEY = 'ACTION_VERSIONS_KEY';

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

function isProdActionFile(file: string) {
  return !file.includes('.dev.');
}
function isAction(action: Partial<Action>): action is Action {
  return Boolean(action.key) && Boolean(action.name) && Boolean(action.version) && action.type === 'action';
}
export function getActionProps(file: string): Action | null {
  const fileContent = Actions.readFileSync(file, 'utf-8');
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
function isActionFile(file: string) {
  return getActionProps(file);
}
function filterFile(file: string) {
  return isActionFile(file) && isProdActionFile(file);
}
export function getActionFilePaths(globs: Globs) {
  return getFilePaths(globs).filter(isActionFile);
}
function getActionName(file: string) {
  const fileContent = Actions.readFileSync(file, 'utf-8');
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

function getActionVersionStoreKey(actionKey: string): string {
  return `${ACTION_VERSIONS_KEY}.${actionKey}`;
}

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
