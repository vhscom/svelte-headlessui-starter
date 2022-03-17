/*!
 * Copyright (C) 2022  VHS <vhsdev@tutanota.com> (https://vhs.codeberg.page)
 *
 * This file is part of Svelte Headless UI Starter.
 *
 * Svelte Headless UI Starter is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Svelte Headless UI Starter is distributed in the hope that it will
 * be useful, but WITHOUT ANY WARRANTY; without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/// <reference lib="WebWorker" />

import { build, files, prerendered, version } from '$service-worker';

/**
 * Service worker global execution context.
 */
const ctx = self as unknown as ServiceWorkerGlobalScope;

/**
 * Dictionary of cacheable resources.
 */
const CACHES = new Map([
	[`vite-cache-v${version}`, build],
	[`file-cache-v${version}`, files],
	[`page-cache-v${version}`, prerendered]
]);

/**
 * Determine if resource should be cached.
 */
const cacheable = (resource: string): string | undefined => {
	for (const [name, resources] of CACHES.entries()) {
		if (resources.includes(resource)) {
			return name;
		}
	}
};

/**
 * Cache cacheable resources.
 */
const maybeCache = (request: Request, response: Response) => {
	const name = cacheable(request.url);
	name &&
		caches.open(name).then((cache) => {
			cache.put(request, response.clone());
		});
	return response;
};

/**
 * Install and activate caches.
 */
ctx.addEventListener('install', (evt) => {
	const deferreds = [];
	for (const [name, resources] of CACHES.entries()) {
		deferreds.push(caches.open(name).then((cache) => cache.addAll(resources)));
	}
	evt.waitUntil(Promise.all(deferreds).finally(ctx.skipWaiting));
});

/**
 * Intercept requests and return cached resources if available.
 */
ctx.addEventListener('fetch', (evt) => {
	evt.respondWith(
		caches.match(evt.request).then((response) => {
			return (
				response ||
				fetch(evt.request).then((res) => {
					return maybeCache(evt.request, res);
				})
			);
		})
	);
});

/**
 * Prune caches, preserving only current cache versions.
 */
ctx.addEventListener('activate', (evt) => {
	evt.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.map((key) => (CACHES.has(key) ? Promise.resolve() : caches.delete(key)))
			);
		})
	);
});
