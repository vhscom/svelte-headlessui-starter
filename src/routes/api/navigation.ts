import type { RequestHandler } from '@sveltejs/kit';
import { navigationData } from '$data';

export const get: RequestHandler = () => {
	return {
		body: JSON.stringify(navigationData)
	};
};
