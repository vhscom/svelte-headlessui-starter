import cookie from 'cookie';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const headers = { Location: '/' };

	// Workaround signOut issue in sk-auth/client. Check for auth cookie
	// and, if found, nullify its value and expire it.
	const cookies = request.headers.get('cookie');
	if (cookies && cookie.parse(cookies)['svelteauthjwt']) {
		headers['set-cookie'] = cookie.serialize('svelteauthjwt', '', {
			path: '/',
			httpOnly: true,
			expires: new Date('1970-01-01 00:00:00 UTC')
		});
	}

	return { headers, status: 302 };
};
