import { getActionsFromFiles, getFilePaths, Globs } from '../utils/files';
import { createWorkflows, CreateWorkflowsOptions } from '../utils/pipedream-ui/create-workflows';

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
