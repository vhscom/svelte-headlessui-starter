type SupabaseConfigKeys = 'SUPABASE_PUBLIC_ANON_KEY' | 'SUPABASE_PROJECT_URL';

export type SupabaseConfigType = {
	[key in SupabaseConfigKeys]: string;
};
