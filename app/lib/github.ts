// GitHub OAuth関連の共通関数

// GitHubアクセストークンを取得する関数
export async function getGitHubAccessToken(code: string) {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  const response = await fetch(accessTokenURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });

  const { error, access_token } = await response.json();

  if (error) {
    throw new Error('Failed to get access token');
  }

  return access_token;
}

// GitHubユーザー情報を取得する関数
export async function getGitHubUserProfile(accessToken: string) {
  const userProfileResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-cache',
  });

  return await userProfileResponse.json();
}

// GitHubユーザーのメールアドレスを取得する関数
export async function getGitHubUserEmail(accessToken: string) {
  const userEmailsResponse = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-cache',
  });

  const emails = await userEmailsResponse.json();

  // プライマリメールアドレスを返す
  const primaryEmail = emails.find(
    (email: any) => email.primary && email.verified
  );

  if (primaryEmail) {
    return primaryEmail.email;
  }

  // プライマリメールがない場合は最初の検証済みメールを返す
  const verifiedEmail = emails.find((email: any) => email.verified);

  if (verifiedEmail) {
    return verifiedEmail.email;
  }

  // メールアドレスが見つからない場合はnullを返す
  return null;
}

// GitHub OAuth認証URLを生成する関数
export function getGitHubAuthURL() {
  const baseURL = 'https://github.com/login/oauth/authorize';
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: 'read:user,user:email',
    allow_signup: 'true',
  };

  const formattedParams = new URLSearchParams(params).toString();
  return `${baseURL}?${formattedParams}`;
}
