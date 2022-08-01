import type { RequestHandler } from '@sveltejs/kit';
import { getOrderedNavigation } from '$lib/utils/endpoint';

export const GET: RequestHandler = async () => {
	return {
		body: JSON.stringify(await getOrderedNavigation())
	};
};
