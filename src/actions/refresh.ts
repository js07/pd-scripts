import { refreshWorkflowActions } from '../pipedream-ui/refresh-actions';

interface RefreshActionProps {
  url: string;
  username: string;
  password: string;
  headless: boolean;
}

export async function refreshActions({ url, username, password, headless }: RefreshActionProps) {
  return refreshWorkflowActions({ url, username, password, headless });
}
