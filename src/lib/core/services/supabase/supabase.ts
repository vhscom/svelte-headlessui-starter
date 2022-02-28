import { createClient } from '@supabase/supabase-js';
import { environment } from '$environment';

const { supabaseConfig } = environment;

const options = {
	/**
	 * By default the API server points to the `public` schema.
	 * https://supabase.com/docs/reference/javascript/initializing#api-schemas
	 */
	schema: 'public',
	headers: { 'x-my-custom-header': 'svelte-headlessui-starter' },
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: true
};

export const supabase = createClient(
	supabaseConfig.SUPABASE_PROJECT_URL,
	supabaseConfig.SUPABASE_PUBLIC_ANON_KEY,
	options
);
