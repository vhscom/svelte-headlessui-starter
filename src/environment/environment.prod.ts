import type { EnvironmentConfig } from '$models/interfaces/environment.interface';
import { EnvironmentType } from '$models/interfaces/environment.interface';

import dotenv from 'dotenv';
dotenv.config();

export const productionEnvironment: EnvironmentConfig = {
	type: EnvironmentType.PRODUCTION,
	name: 'production',
	authConfig: {
		GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
		GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
		OAUTH_JWT_SECRET_KEY: process.env.OAUTH_JWT_SECRET_KEY,
		CUSTOM_OAUTH_REDIRECT_URI: process.env.CUSTOM_OAUTH_REDIRECT_URI
	},
	supabaseConfig: {
		SUPABASE_PUBLIC_ANON_KEY: process.env.SUPABASE_PUBLIC_ANON_KEY,
		SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL
	},
	debug: false
};
