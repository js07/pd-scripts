import * as Files from '../utils/files';
import { log } from '../utils/logger';

interface VersionActionProps {
  globs: Files.Globs;
}

interface ChangeVersionActionProps extends VersionActionProps {
  storePrev?: boolean;
}

export function restoreVersion({ globs }: VersionActionProps) {
  log('Restoring versions...');
  const filePaths = Files.getActionFilePaths(globs);
  return Files.restoreVersions(filePaths);
}

export function storeVersion({ globs }: VersionActionProps) {
  log('Storing versions...');
  const filePaths = Files.getActionFilePaths(globs);
  return Files.storeVersions(filePaths);
}

export function bumpVersion({ globs, storePrev }: ChangeVersionActionProps) {
  const filePaths = Files.getActionFilePaths(globs);
  if (storePrev) {
    // Files.storeVersions(globs);
    storeVersion({ globs: filePaths });
  }
  log('Bumping versions...');
  return Files.bumpVersion(filePaths);
}
export function setVersion({ globs, storePrev, version }: ChangeVersionActionProps & { version: string }) {
  const filePaths = Files.getActionFilePaths(globs);
  if (storePrev) {
    // Files.storeVersions(globs);
    storeVersion({ globs: filePaths });
  }
  log('Setting versions...');
  return Files.setVersion(filePaths, version);
}

export function setDevVersion({ globs, storePrev }: ChangeVersionActionProps) {
  const filePaths = Files.getActionFilePaths(globs);
  if (storePrev) {
    // Files.storeVersions(globs);
    storeVersion({ globs: filePaths });
  }
  log('Setting dev versions...');
  return Files.setDevVersion(filePaths);
}

export function resetVersion({ globs, storePrev }: ChangeVersionActionProps) {
  const filePaths = Files.getActionFilePaths(globs);
  if (storePrev) {
    // Files.storeVersions(globs);
    storeVersion({ globs: filePaths });
  }
  log('Resetting versions...');
  return Files.resetVersion(filePaths);
}
