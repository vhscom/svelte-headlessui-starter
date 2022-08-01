import type { RequestHandler } from '@sveltejs/kit';
import { userData } from '$data';

export const GET: RequestHandler = () => {
	return {
		body: JSON.stringify(userData)
	};
};
