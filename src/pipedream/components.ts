import gulp from 'gulp';
import replace from 'gulp-replace';
import { Globs, promisifyStream } from '../utils/file';

export function propRegex(propName: string) {
  return new RegExp(`${propName}: ['"](.+)['"]`);
}
export function keyRegex() {
  return propRegex('key');
}
export function nameRegex() {
  return propRegex('name');
}
export function versionRegex() {
  return propRegex('version');
}
export function typeRegex() {
  return propRegex('type');
}

export function changeVersion(
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
