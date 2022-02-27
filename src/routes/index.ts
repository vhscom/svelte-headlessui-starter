import type { RequestHandler } from '@sveltejs/kit';
import { navigationData } from '$data';
import { formatNavigation } from '$utils';

export const get: RequestHandler = async ({ request }) => {
	const [firstNavItem] = formatNavigation(navigationData, request.url);

	return {
		headers: { Location: firstNavItem.href },
		status: 302
	};
};
