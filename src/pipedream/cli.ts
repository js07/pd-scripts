import { spawnSync } from 'child_process';

export function publish(file: string, profile?: string) {
  spawnSync('pd', ['publish', file, ...(profile ? ['--profile', profile] : [])], { stdio: 'inherit' });
}
export function publishFiles(files: string[], profile?: string) {
  for (const file of files) {
    publish(file, profile);
  }
}
