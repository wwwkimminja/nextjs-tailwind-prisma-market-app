import { getGitHubAuthURL } from '@/lib/github';

export function GET() {
  const url = getGitHubAuthURL();
  return Response.redirect(url);
}
