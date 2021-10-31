import { spawnSync } from 'child_process';

// const result_inherited = spawnSync('ls', [ '-l', '-a' ], { stdio: 'inherit'});

export function publish(file: string, profile?: string) {
  // const { stdout } = await exec(`pd publish ${file} --profile tpd12`);
  // console.log(stdout);
  spawnSync('pd', ['publish', file, ...(profile ? ['--profile', profile] : [])], { stdio: 'inherit' });
}
export function publishFiles(files: string[], profile?: string) {
  for (const file of files) {
    publish(file, profile);
  }
}
