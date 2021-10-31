import { restoreVersion, storeVersion } from '.';
import * as Files from '../utils/files';
import { log } from '../utils/logger';
import { publishFiles } from '../utils/pipedream/cli';

export interface PublishActionProps {
  globs: Files.Globs;
  profile?: string;
  dev?: boolean;
}

export async function publish({ globs, profile, dev }: PublishActionProps) {
  const filePaths = Files.getActionFilePaths(globs);

  if (dev) {
    storeVersion({ globs: filePaths });
    log('Setting dev versions...');
    await Files.setDevVersion(filePaths);
  }

  log('Publishing components...');
  publishFiles(filePaths, profile);

  if (dev) {
    await restoreVersion({ globs: filePaths });
  }
}
