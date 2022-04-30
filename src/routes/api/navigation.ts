import type { RequestHandler } from '@sveltejs/kit';
import { getOrderedNavigation } from '$lib/utils/endpoint';

export const get: RequestHandler = async () => {
	return {
		body: JSON.stringify(await getOrderedNavigation())
	};
};
