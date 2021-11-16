import { getFilePaths, Globs } from '../utils/file';
import { createWorkflows, CreateWorkflowsOptions } from '../pipedream-ui/create-workflows';
import { getActionsFromFiles } from '../pipedream/actions';

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
