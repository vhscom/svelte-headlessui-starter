import type { RequestHandler } from '@sveltejs/kit';
import { getOrderedNavigation } from '$utils/endpoint';

export const get: RequestHandler = async () => {
	const orderedNavigation = await getOrderedNavigation();
	const [firstNavItem] = orderedNavigation;

	return {
		headers: { Location: firstNavItem.href },
		status: 302
	};
};
