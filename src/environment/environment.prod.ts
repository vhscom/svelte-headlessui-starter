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
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
		CUSTOM_OAUTH_REDIRECT_URI: process.env.CUSTOM_OAUTH_REDIRECT_URI
	},
	debug: false
};
