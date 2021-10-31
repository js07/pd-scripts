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
  return Files.restoreVersions(globs);
}

export function storeVersion({ globs }: VersionActionProps) {
  log('Storing versions...');
  return Files.storeVersions(globs);
}

export function bumpVersion({ globs, storePrev }: ChangeVersionActionProps) {
  if (storePrev) {
    // Files.storeVersions(globs);
    storeVersion({ globs });
  }
  log('Bumping versions...');
  return Files.bumpVersion(globs);
}
export function setVersion({ globs, storePrev, version }: ChangeVersionActionProps & { version: string }) {
  if (storePrev) {
    // Files.storeVersions(globs);
    storeVersion({ globs });
  }
  log('Setting versions...');
  return Files.setVersion(globs, version);
}

export function setDevVersion({ globs, storePrev }: ChangeVersionActionProps) {
  if (storePrev) {
    // Files.storeVersions(globs);
    storeVersion({ globs });
  }
  log('Setting dev versions...');
  return Files.setDevVersion(globs);
}

export function resetVersion({ globs, storePrev }: ChangeVersionActionProps) {
  if (storePrev) {
    // Files.storeVersions(globs);
    storeVersion({ globs });
  }
  log('Resetting versions...');
  return Files.resetVersion(globs);
}
