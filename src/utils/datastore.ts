import Configstore from 'configstore';
import fs from 'fs';
import path from 'path';

// const packageJson = require('../../package.json'); // Alternative
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8'));

// Create a Configstore instance.
const config = new Configstore(packageJson.name, { foo: 'bar' });

export function set(key: string | object, value?: any) {
  if (typeof key === 'object') {
    return config.set(key);
  }
  config.set(key, value);
}

export function get(key: string) {
  return config.get(key);
}
