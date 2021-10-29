import { flags } from '@oclif/command';

export default {
  storePrev: flags.boolean({ description: 'store action versions to restore later?', default: false }),
};
