import * as Files from '../utils/files';

interface VersionActionProps {
  globs: Files.Globs;
}

interface ChangeVersionActionProps extends VersionActionProps {
  storePrev?: boolean;
}

export function bumpVersion({ globs, storePrev }: ChangeVersionActionProps) {
  if (storePrev) {
    Files.storeVersions(globs);
  }
  Files.bumpVersion(globs);
}
export function setVersion({ globs, storePrev, version }: ChangeVersionActionProps & { version: string }) {
  if (storePrev) {
    Files.storeVersions(globs);
  }
  Files.setVersion(globs, version);
}

export function setDevVersion({ globs, storePrev }: ChangeVersionActionProps) {
  if (storePrev) {
    Files.storeVersions(globs);
  }
  Files.setDevVersion(globs);
}

export function resetVersion({ globs, storePrev }: ChangeVersionActionProps) {
  if (storePrev) {
    Files.storeVersions(globs);
  }
  Files.resetVersion(globs);
}

export function restoreVersion({ globs }: VersionActionProps) {
  Files.restoreVersions(globs);
}

export function storeVersion({ globs }: VersionActionProps) {
  Files.storeVersions(globs);
}
