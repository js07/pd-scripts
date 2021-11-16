import { restoreVersion, setDevVersion } from '.';
import * as Files from '../utils/file';
import { log } from '../utils/logger';
import { publishFiles } from '../pipedream/cli';
import { getActionFilePaths } from '../pipedream/actions';

export interface PublishActionProps {
  globs: Files.Globs;
  profile?: string;
  dev?: boolean;
}

export async function publish({ globs, profile, dev }: PublishActionProps) {
  const filePaths = getActionFilePaths(globs);

  if (dev) {
    await setDevVersion({ globs: filePaths, storePrev: true });
  }

  log('Publishing components...');
  publishFiles(filePaths, profile);

  if (dev) {
    await restoreVersion({ globs: filePaths });
  }
}
