/// <reference types="node" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * OAuth App client identifier provided by GitHub
			 */
			readonly GITHUB_OAUTH_CLIENT_ID: string;
			/**
			 * OAuth App client secret provided by GitHub
			 */
			readonly GITHUB_OAUTH_CLIENT_SECRET: string;
			/**
			 * JSON Web Token secret key
			 */
			JWT_SECRET_KEY: string;
			/**
			 * Redirect URI for use with custom Auth endpoint
			 */
			readonly CUSTOM_OAUTH_REDIRECT_URI: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
