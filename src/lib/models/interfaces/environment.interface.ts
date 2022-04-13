import type { AuthConfigType } from '$models/types/auth.type';
import type { SupabaseConfigType } from '$models/types/supabase.type';
import type { Dictionary } from '$models/types/dictionary.type';

export enum EnvironmentType {
	'DEVELOPMENT',
	'PRODUCTION'
}

export interface EnvironmentConfig extends Dictionary {
	type: EnvironmentType;
	name: string;
	authConfig: AuthConfigType;
	supabaseConfig: SupabaseConfigType;
	debug: boolean;
}
