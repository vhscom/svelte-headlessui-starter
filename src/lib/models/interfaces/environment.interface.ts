import type { AuthConfigType } from '$models/types/auth.type';
import type { SupabaseConfigType } from '$models/types/supabase.type';

export enum EnvironmentType {
	'DEVELOPMENT',
	'PRODUCTION'
}

export interface EnvironmentConfig {
	type: EnvironmentType;
	name: string;
	authConfig: AuthConfigType;
	supabaseConfig: SupabaseConfigType;
	debug: boolean;
}
