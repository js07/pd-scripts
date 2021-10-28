import fs from 'fs'
import Configstore from 'configstore'

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

// Create a Configstore instance.
const config = new Configstore(packageJson.name, {foo: 'bar'})

export function set(key: string, value: any) {
  config.set(key, value)
}

export function get(key: string) {
  config.get(key)
}
