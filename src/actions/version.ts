// import * as Files from '../utils/file';
import * as Actions from '../pipedream/actions';
import * as Components from '../pipedream/components';
import { Globs } from '../utils/file';
import { log } from '../utils/logger';

interface VersionActionProps {
  globs: Globs;
}

interface ChangeVersionActionProps extends VersionActionProps {
  storePrev?: boolean;
}

export function restoreVersion({ globs }: VersionActionProps) {
  log('Restoring version(s)...');
  const filePaths = Actions.getActionFilePaths(globs);
  return Actions.restoreVersions(filePaths);
}

export function storeVersion({ globs }: VersionActionProps) {
  log('Storing version(s)...');
  const filePaths = Actions.getActionFilePaths(globs);
  return Actions.storeVersions(filePaths);
}

export function bumpVersion({ globs, storePrev }: ChangeVersionActionProps) {
  const filePaths = Actions.getActionFilePaths(globs);
  if (storePrev) {
    storeVersion({ globs: filePaths });
  }
  return Components.bumpVersion(filePaths);
}
export function setVersion({ globs, storePrev, version }: ChangeVersionActionProps & { version: string }) {
  const filePaths = Actions.getActionFilePaths(globs);
  if (storePrev) {
    storeVersion({ globs: filePaths });
  }
  return Components.setVersion(filePaths, version);
}

export function setDevVersion({ globs, storePrev }: ChangeVersionActionProps) {
  const filePaths = Actions.getActionFilePaths(globs);
  if (storePrev) {
    storeVersion({ globs: filePaths });
  }
  log('Setting dev version(s)...');
  return Components.setDevVersion(filePaths);
}

export function resetVersion({ globs, storePrev }: ChangeVersionActionProps) {
  const filePaths = Actions.getActionFilePaths(globs);
  if (storePrev) {
    storeVersion({ globs: filePaths });
  }
  log('Resetting version(s)...');
  return Components.resetVersion(filePaths);
}
