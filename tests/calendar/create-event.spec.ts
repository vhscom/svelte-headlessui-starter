import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/calendar');
});

test.describe('Add event dialog', () => {
	test('contains accessible translucent overlay', async ({ page }) => {
		const addEventButton = page.locator('text=Add event');
		const dialog = page.locator('[role="dialog"]');
		await addEventButton.click();

		const overlay = dialog.locator('[id*="overlay"]');
		await expect(overlay).toBeVisible();
		expect(await overlay.getAttribute('aria-hidden')).toBe('true');
	});

	test('displays dialog with form', async ({ page }) => {
		const addEventButton = page.locator('text=Add event');
		const dialog = page.locator('[role="dialog"]');

		expect(dialog).not.toBeVisible();
		await addEventButton.click();

		expect(dialog.locator('form')).toBeDefined();
		await expect(dialog).toBeVisible();
	});

	test.describe('Add event form', () => {
		test.beforeEach(async ({ page }) => {
			const addEventButton = page.locator('text=Add event');
			const dialog = page.locator('[role="dialog"]');
			await addEventButton.click();
			await expect(dialog).toBeVisible();
		});

		test('has buttons to submit and reset the form', async ({ page }) => {
			const form = page.locator('[role="dialog"] form');
			const saveButton = form.locator('button[type="submit"]');
			const clearButton = form.locator('button[type="reset"]');

			await expect(saveButton).toBeVisible();
			await expect(clearButton).toBeVisible();
		});

		test('closes dialog when reset button clicked', async ({ page }) => {
			const dialog = page.locator('[role="dialog"]');
			const form = page.locator('[role="dialog"] form');
			const clearButton = form.locator('button[type="reset"]');

			await clearButton.click();
			await expect(dialog).not.toBeVisible();
		});

		test('focuses title input by default', async ({ page }) => {
			const form = page.locator('[role="dialog"] form');
			const titleInput = form.locator('input[name="title"]');

			await expect(titleInput).toBeFocused();
			await titleInput.press('Tab');
			await expect(titleInput).not.toBeFocused();
		});

		test('focuses title input if submitted without value', async ({ page }) => {
			const form = page.locator('[role="dialog"] form');
			const saveButton = form.locator('button[type="submit"]');
			const titleInput = form.locator('input[name="title"]');

			titleInput.press('Tab');
			await expect(titleInput).not.toBeFocused();
			await saveButton.click();
			await expect(titleInput).toBeFocused();
			await expect(saveButton).not.toBeDisabled();
		});

		test('focuses event start input if submitted with title only', async ({ page }) => {
			const form = page.locator('[role="dialog"] form');
			const saveButton = form.locator('button[type="submit"]');
			const titleInput = form.locator('input[name="title"]');
			const startInput = form.locator('input[name="start"]');

			await titleInput.fill('Event title');
			await saveButton.click();
			await expect(startInput).toBeFocused();
			await expect(saveButton).not.toBeDisabled();
		});

		test('accepts submission with event title and start only', async ({ page }) => {
			const form = page.locator('[role="dialog"] form');
			const saveButton = form.locator('button[type="submit"]');
			const titleInput = form.locator('input[name="title"]');
			const startInput = form.locator('input[name="start"]');

			await titleInput.fill('Event title');
			await startInput.fill('2022-02-22');
			await saveButton.click();
			await expect(titleInput).not.toBeFocused();
			await expect(startInput).not.toBeFocused();
			await expect(saveButton).toBeDisabled();
		});

		test('requires start and end for non-allday events', async ({ page }) => {
			const form = page.locator('[role="dialog"] form');
			const saveButton = form.locator('button[type="submit"]');
			const titleInput = form.locator('input[name="title"]');
			const startInput = form.locator('input[name="start"]');
			const endInput = form.locator('input[name="end"]');
			const alldayCheckbox = form.locator('input[name="allday"]');

			await titleInput.fill('Event title');
			await alldayCheckbox.setChecked(false);
			await startInput.fill('2022-02-22T02:00');
			await saveButton.click();
			await expect(saveButton).not.toBeDisabled();
			await expect(endInput).toBeFocused();
			await endInput.fill('2022-02-22T02:00');
			await saveButton.click();
			await expect(endInput).not.toBeFocused();
			await expect(saveButton).toBeDisabled();
		});
	});
});
