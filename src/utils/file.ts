import * as glob from 'glob';
import * as fs from 'fs';
import { Stream } from 'stream';

export type Globs = string | string[];

export function promisifyStream(stream: Stream) {
  return new Promise(res => stream.on('end', res));
}
function isGlobPattern(str: string) {
  return str.includes('*');
}
function isFolder(pathString: string) {
  return fs.lstatSync(pathString).isDirectory();
}
export function getFilePaths(globs: Globs): string[] {
  if (Array.isArray(globs)) {
    const filePaths: string[] = [];
    return filePaths.concat(...globs.map(getFilePaths));
  }
  if (isGlobPattern(globs)) {
    return glob.sync(globs, {  ignore: '**/node_modules/**' });
  }
  if (isFolder(globs)) {
    return getFilePaths(`${globs}/**/*.*js`);
  }
  return [globs];
}

export function getFiles(globPattern: string) {
  return glob.sync(globPattern);
}

