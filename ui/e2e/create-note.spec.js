import { expect, test } from '@playwright/test';
import { mockAuthAndInitialNotes } from './helpers';

test('create note flow submits note form', async ({ page }) => {
  await mockAuthAndInitialNotes(page, []);

  await page.goto('/login');
  await page.getByPlaceholder('Email or phone number').fill('exam@example.com');
  await page.getByPlaceholder('Enter password').fill('Password123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('link', { name: 'Add Notes' }).click();
  await page.getByPlaceholder('Product Team Meeting').fill('Quarterly Product Review');
  await page.getByPlaceholder('Write a concise note description').fill('Discuss roadmap and metrics.');
  await page.getByRole('button', { name: 'Create Note' }).click();

  await expect(page.getByRole('heading', { name: 'Notes' })).toBeVisible();
});
