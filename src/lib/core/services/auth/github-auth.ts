import { Providers, SvelteKitAuth } from 'sk-auth';
import { GitHubOAuth2Provider } from 'sk-auth/providers';
import { environment } from '$environment';
import { EnvironmentType } from '$models/interfaces/environment.interface';

const { authConfig, type } = environment;

// Customize AuthConfig settings for development. Assumes callback URL
// of http://localhost:3000/api/auth/callback/github configured on GitHub.
const developmentOptions =
	type === EnvironmentType.DEVELOPMENT
		? {
				host: 'localhost:3000',
				protocol: 'http',
				basePath: '/api/auth'
		  }
		: {};

// Visit https://github.com/settings/applications/new
// to register a new OAuth application on GitHub
export const githubAuth = new SvelteKitAuth({
	providers: [
		new GitHubOAuth2Provider({
			clientId: authConfig.GITHUB_OAUTH_CLIENT_ID,
			clientSecret: authConfig.GITHUB_OAUTH_CLIENT_SECRET,
			profile(profile) {
				return { ...profile, provider: 'github' };
			}
		}),
		new (class extends Providers.GitHubOAuth2Provider {
			// Bespoke class illustrating how to customize a provider
			// To use, navigate user agent to /api/auth/signin/custom
			constructor() {
				super({
					clientId: authConfig.GITHUB_OAUTH_CLIENT_ID,
					clientSecret: authConfig.GITHUB_OAUTH_CLIENT_SECRET,
					profile(profile) {
						return { ...profile, provider: 'custom' };
					}
				});
			}

			// For example, monkey patch a method of the abstract base class
			// to nullify AuthConfig options affecting redirect URIs
			getCallbackUri(): string {
				return authConfig.CUSTOM_OAUTH_REDIRECT_URI;
			}
		})()
	],
	callbacks: {
		redirect: (uri) => uri // Extend or introspect redirect callbacks
		// ...and access to other available AuthCallbacks as well
	},
	...developmentOptions,
	jwtSecret: authConfig.OAUTH_JWT_SECRET_KEY
});
