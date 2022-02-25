type AuthConfigKeys =
	| 'GITHUB_OAUTH_CLIENT_ID'
	| 'GITHUB_OAUTH_CLIENT_SECRET'
	| 'JWT_SECRET_KEY'
	| 'CUSTOM_OAUTH_REDIRECT_URI';

export type AuthConfigType = {
	[key in AuthConfigKeys]: string;
};
