import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/calendar');
});

test('page has expected h1', async ({ page }) => {
	expect(await page.textContent('h1')).toBe('Calendar');
});

test('provides example prose content in main section', async ({ page }) => {
	const locator = page.locator('main .prose');
	await expect(locator).toContainText('Example content for the calendar page.');
});

test.describe('Calendar component', () => {
	test('displays the current month and year', async ({ page }) => {
		const d = new Date();
		const monthText = d.toLocaleString('default', { month: 'long' });
		const yearText = d.getFullYear();

		expect(await page.textContent('section.not-prose h1')).toBe(`${monthText} ${yearText}`);
	});

	test('can display previous month', async ({ page }) => {
		const now = new Date();
		const d = new Date(now.setMonth(now.getMonth() - 1));
		const monthText = d.toLocaleString('default', { month: 'long' });
		const yearText = d.getFullYear();
		const button = page.locator('text=View previous month');

		await button.click();
		expect(await page.textContent('section.not-prose h1')).toContain(`${monthText} ${yearText}`);
	});

	test('can display next month', async ({ page }) => {
		const now = new Date();
		const d = new Date(now.setMonth(now.getMonth() + 1));
		const monthText = d.toLocaleString('default', { month: 'long' });
		const yearText = d.getFullYear();
		const button = page.locator('text=View next month');

		await button.click();
		expect(await page.textContent('section.not-prose h1')).toContain(`${monthText} ${yearText}`);
	});

	test('can display previous year', async ({ page }) => {
		const now = new Date();
		const d = new Date(now.setMonth(now.getMonth() - 12));
		const monthText = d.toLocaleString('default', { month: 'long' });
		const yearText = d.getFullYear();
		const button = page.locator('text=View previous month');

		await button.click({ clickCount: 12 });
		expect(await page.textContent('section.not-prose h1')).toContain(`${monthText} ${yearText}`);
	});

	test('can display next year', async ({ page }) => {
		const now = new Date();
		const d = new Date(now.setMonth(now.getMonth() + 12));
		const monthText = d.toLocaleString('default', { month: 'long' });
		const yearText = d.getFullYear();
		const button = page.locator('text=View next month');

		await button.click({ clickCount: 12 });
		expect(await page.textContent('section.not-prose h1')).toContain(`${monthText} ${yearText}`);
	});

	test('can jump back to current month', async ({ page }) => {
		const d = new Date();
		const monthText = d.toLocaleString('default', { month: 'long' });
		const yearText = d.getFullYear();
		const nextButton = page.locator('text=View next month');
		const todayButton = page.locator('text=Today');

		await nextButton.click({ clickCount: 2 });
		await todayButton.click();
		expect(await page.textContent('section.not-prose h1')).toContain(`${monthText} ${yearText}`);
	});

	test('shows accessible dropdown menu on small screens', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		const menuButton = page.locator('section.not-prose [aria-haspopup="true"]');
		expect(await menuButton.getAttribute('aria-expanded')).toBe('false');

		await menuButton.click();
		expect(await menuButton.getAttribute('aria-expanded')).toBe('true');
	});
});
