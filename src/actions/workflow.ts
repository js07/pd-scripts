import { getActionsFromFiles, getFilePaths, Globs } from '../utils/files';
import { createWorkflows, CreateWorkflowsOptions } from '../utils/pipedream-ui/create-workflows';
import { refreshWorkflowActions } from '../utils/pipedream-ui/refresh-actions';

// export { createWorkflows } from '../utils/pipedream-ui/create-workflows';
// export { createWorkflows } from '../utils/pipedream-ui/create-workflows';

export type CreateWorkflowActionProps = Pick<
  CreateWorkflowsOptions,
  | 'app'
  | 'accountName'
  | 'selectAccount'
  | 'username'
  | 'password'
  | 'combined'
  | 'headless'
> & {
  globs: Globs;
};

export async function createWorkflow({ globs, ...opts }: CreateWorkflowActionProps) {
  const filePaths = getFilePaths(globs);
  const actionNames = getActionsFromFiles(filePaths);

  return createWorkflows({
    actions: actionNames,
    ...opts,
  });
}

interface RefreshActionProps {
  url: string;
  username: string;
  password: string;
  headless: boolean;
}

export async function refreshActions({ url, username, password, headless }: RefreshActionProps) {
  return refreshWorkflowActions({ url, username, password, headless });
}
