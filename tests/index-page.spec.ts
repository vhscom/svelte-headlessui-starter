import { expect, test } from '@playwright/test';

test('index page redirects to dashboard', async ({ page }) => {
	const response = await page.goto('/');
	const request = response.request().redirectedFrom();
	expect(request.redirectedTo().url() === '/dashboard');
});

test('dashboard page has expected h1', async ({ page }) => {
	await page.goto('/dashboard');
	expect(await page.textContent('h1')).toBe('Dashboard');
});
