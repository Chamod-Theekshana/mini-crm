import { expect, test } from '@playwright/test';
import { mockAuthAndInitialNotes } from './helpers';

test('login flow redirects to notes page', async ({ page }) => {
  await mockAuthAndInitialNotes(page, []);

  await page.goto('/login');
  await page.getByPlaceholder('Email or phone number').fill('exam@example.com');
  await page.getByPlaceholder('Enter password').fill('Password123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByRole('heading', { name: 'Notes' })).toBeVisible();
});
