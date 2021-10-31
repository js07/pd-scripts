import { createWorkflow, CreateWorkflowActionProps } from '.';
import { publish, PublishActionProps } from './publish';

type QAActionProps = PublishActionProps & CreateWorkflowActionProps;

export async function qa({ globs, ...opts }: QAActionProps) {
  await publish({ globs, ...opts });

  await createWorkflow({ globs, ...opts });
}
