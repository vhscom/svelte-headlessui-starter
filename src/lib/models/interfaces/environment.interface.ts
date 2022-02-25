import type { AuthConfigType } from '$models/types/auth.type';

export enum EnvironmentType {
	'DEVELOPMENT',
	'PRODUCTION'
}

export interface EnvironmentConfig {
	type: EnvironmentType;
	name: string;
	authConfig: AuthConfigType;
	debug: boolean;
}
