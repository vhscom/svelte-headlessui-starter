export const createApi = (url: string, fetch) => {
	return new Proxy(fetch, {
		get(_, key) {
			return async function (id = '') {
				const res = id
					? await fetch(`${url}/${String(key)}/${id}`)
					: await fetch(`${url}/${String(key)}`);
				if (res.ok) {
					return res.json();
				}
				return Promise.reject({ error: 'Malformed Request' });
			};
		}
	});
};
