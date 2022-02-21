import type { RequestHandler } from '@sveltejs/kit';
import { userData } from '$data';

export const get: RequestHandler = ({ params }) => {
	return {
		body: JSON.stringify(userData.find((user) => user.id === params.id))
	};
};
