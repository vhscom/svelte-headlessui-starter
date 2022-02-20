import type { RequestHandler } from '@sveltejs/kit';
import { userData } from '$data';

export const get: RequestHandler = () => {
	return {
		body: JSON.stringify(userData)
	};
};
