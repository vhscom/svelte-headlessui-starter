import { environment } from '$environment';
import { GraphQLClient } from 'graphql-request';

const { supabaseConfig } = environment;

const token = supabaseConfig.SUPABASE_PUBLIC_ANON_KEY;
const endpoint = `${supabaseConfig.SUPABASE_PROJECT_URL}/graphql/v1`;

export const graphQLClient = new GraphQLClient(endpoint, {
	headers: {
		apiKey: token,
		authorization: `Bearer ${token}`
	}
});

export { gql } from 'graphql-request';
