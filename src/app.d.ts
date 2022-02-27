/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
	// See https://vercel.com/docs/concepts/projects/environment-variables
	// for information about these environment variables
	readonly VITE_VERCEL_ENV: 'production' | 'preview' | 'development';
	readonly VITE_VERCEL_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface GitHubUserProfile {
	login: string;
	id: number;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: 'User' | string;
	site_admin: boolean;
	name: string;
	company: string;
	blog: string;
	location: string;
	email: string;
	hireable: boolean;
	bio: string;
	twitter_username: string;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
	private_gists: number;
	total_private_repos: number;
	owned_private_repos: number;
	disk_usage: number;
	collaborators: number;
	two_factor_authentication: boolean;
	plan: Readonly<{
		name: string;
		space: number;
		collaborators: number;
		private_repos: 10000;
	}>;
	provider: 'github';
}

interface GitHubAuthErrorProfile {
	readonly message: string;
	readonly documentation_url: string;
	readonly provider: 'github';
}

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		/**
		 * True for responses with 4xx and 5xx status codes.
		 */
		error: boolean;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Platform {}

	interface Session {
		user: Readonly<GitHubUserProfile> & Partial<GitHubAuthErrorProfile>;
		error: boolean;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Stuff {}
}
